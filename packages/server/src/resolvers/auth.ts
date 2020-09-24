import { compare } from 'bcrypt'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Repository } from '~/db'
import { GraphQLContext } from '~/graphql'
import { Logger } from '~/logger'
import {
  DEFAULT_USER,
  EntityType,
  EventType,
  getLog,
  isDefaultPhoneNumber,
  RequestOrigin,
  User,
  UserModel
} from '~/models'
import {
  AuthError,
  AuthErrorMessage,
  cookies,
  createAuthCode,
  createResetToken,
  CurrentUser,
  SigninUserInput,
  SignoutUserInput
} from '~/modules'

const logger = Logger.create({
  src: 'resolver/auth'
})

/**
 * Authentication resolver.
 */
@Resolver()
export class AuthResolver {
  private repo: Repository<User>

  constructor (repo?: Repository<User>) {
    this.repo = repo || new Repository<User>(UserModel, DEFAULT_USER)
  }

  // #region Query

  /**
   * Returns the current user.
   * @param context GraphQL context.
   * @returns Current user.
   */
  @Query(() => CurrentUser, { nullable: true })
  async currentUser (@Ctx() { currentUser }: GraphQLContext) {
    // REVIEW Check whether current user exists
    // or do it in the middleware?
    // if (!currentUser) return null
    // const user = await UserModel.findById(currentUser.id)
    // if (!user) return null
    // return new CurrentUser(user)

    return currentUser
  }

  // #endregion

  // #region Mutation

  /**
   * Signs in a user.
   * @param input Input.
   * @param context GraphQL context.
   * @returns Current user.
   */
  @Mutation(() => CurrentUser, { nullable: true })
  async signinUser (
    @Arg('data') input: SigninUserInput,
    @Ctx() { res }: GraphQLContext
  ) {
    const { email, phone } = input

    // find user
    let user = email
      ? await UserModel.findOne({ email })
      : !isDefaultPhoneNumber(phone)
        ? await UserModel.findOne({ phone })
        : undefined

    if (!user) {
      throw new AuthError('USER_NOT_FOUND', {
        operation: 'SIGNIN'
      })
    }

    // compare passwords
    if (!(await compare(input.password, user.password))) {
      const signinFailures = user.signinFailures + 1

      // create an authentication code and reset token
      // so the user should reset his/her password
      let code: string | undefined
      let message: AuthErrorMessage = 'WRONG_PASSWORD'
      let resetToken = user.resetToken

      if (signinFailures >= 3) {
        code = createAuthCode()
        message = 'RESET_PASSWORD'
        resetToken = createResetToken(code)
      }

      // log the failure
      await this.repo.update(
        user,
        {
          signinFailures,
          resetToken
        },
        getLog(input, {
          event: EventType.AUTH_WRONG_PASSWORD,
          entity: EntityType.USER,
          entityId: user._id,
          message
        })
      )

      // notify user about the failure
      throw new AuthError(message, {
        operation: 'SIGNIN'
      })
    }

    // update user and log the operation
    user = await this.repo.update(
      user,
      {
        signinFailures: 0,
        resetToken: undefined,
        auth: user.auth + 1
      },
      getLog(input, {
        event: EventType.AUTH_SIGNIN,
        entity: EntityType.USER,
        entityId: user._id
      })
    )

    const currentUser = new CurrentUser(user)

    // create auth tokens and send cookies
    currentUser.setTokens()
    if (input.origin === RequestOrigin.WEB) {
      cookies.send(res, currentUser)
    }

    logger.debug('signinUser', { now: new Date(), currentUser })
    return currentUser
  }

  /**
   * Signs out the current user.
   * @param input Input.
   * @param context GraphQL context.
   * @returns True if the operation is successful.
   */
  @Mutation(() => Boolean)
  async signoutUser (
    @Arg('data', { nullable: true }) input: SignoutUserInput,
    @Ctx() { res, currentUser }: GraphQLContext
  ) {
    if (!currentUser) return false

    const user = await this.repo.findById(currentUser.id)
    if (!user) return false

    // update user and log the operation
    await this.repo.update(
      user,
      {
        auth: user.auth + 1
      },
      getLog(input, {
        event: EventType.AUTH_SIGNOUT,
        entity: EntityType.USER,
        entityId: user._id
      })
    )

    // clear cookies
    if (input.origin === RequestOrigin.WEB) {
      cookies.clear(res)
    }

    return true
  }

  // #endregion

  // #region Subscription
  // #endregion
}
