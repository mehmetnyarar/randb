import { UserInputError } from 'apollo-server-express'
import { hash } from 'bcrypt'
import { merge } from 'lodash'
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { QueryBuilder, Repository } from '~/db'
import { GraphQLContext } from '~/graphql'
import { Logger } from '~/logger'
import {
  createUsername,
  DEFAULT_USER,
  DeleteUserInput,
  getDoc,
  getLog,
  UpsertUserInput,
  User,
  UserFilter,
  UserModel,
  UsersFilter
} from '~/models'
import { ConnectionInput, edge, paginate, response } from '~/modules'

const logger = Logger.create({
  src: 'resolver/auth'
})

// #region Pagination

@ObjectType()
export class UserEdge extends edge(User) {}

@ObjectType()
export class UserConnection extends response(UserEdge) {}

// #endregion

/**
 * User resolver.
 */
@Resolver(User)
export class UserResolver {
  private repo: Repository<User>

  constructor (repo?: Repository<User>) {
    this.repo = repo || new Repository<User>(UserModel, DEFAULT_USER)
  }

  // #region Field

  @FieldResolver()
  location (@Root() user: User) {
    return user.locations.length
      ? user.locations[user.locations.length - 1]
      : undefined
  }

  @FieldResolver()
  async createdBy (@Root() entity: User) {
    return entity.createdBy && UserModel.findById(entity.createdBy)
  }

  @FieldResolver()
  async updatedBy (@Root() entity: User) {
    return entity.updatedBy && UserModel.findById(entity.updatedBy)
  }

  // #endregion

  // #region Query

  /**
   * Finds users.
   * @param [filter] Filter.
   * @returns Users.
   */
  @Query(() => [User])
  async users (@Arg('filter', { nullable: true }) filter: UsersFilter = {}) {
    const query = QueryBuilder.entities<User>(UserModel, filter)
      .regex('username', filter.username)
      .eq('name', filter.name)
      .email('email', filter.email)
      .eq('phone', filter.phone)
      .in('gender', filter.gender)
      .between('birthday', filter.birthday)
      .in('roles', filter.roles)
      .conditions()

    logger.debug('users', { query })
    const items = await this.repo.find(query)

    return items
  }

  /**
   * Finds users.
   * @param [filter] Filter.
   * @param [connection] Pagination connection.
   * @returns UserConnection.
   */
  @Query(() => UserConnection)
  async pagedUsers (
    @Arg('filter', { nullable: true }) filter: UsersFilter = {},
    @Arg('connection', { nullable: true }) connection: ConnectionInput = {}
  ) {
    const query = QueryBuilder.entities<User>(UserModel, filter)
      .regex('username', filter.username)
      .eq('name', filter.name, 'falsy')
      .email('email', filter.email)
      .eq('phone', filter.phone)
      .in('gender', filter.gender)
      .between('birthday', filter.birthday)
      .in('roles', filter.roles)
      .conditions()

    logger.debug('pagedUsers', { filter, query })
    const items = await this.repo.find(query)

    return paginate(items, connection)
  }

  /**
   * Finds a specific user.
   * @param [filter] Filter.
   * @returns User.
   */
  @Query(() => User, { nullable: true })
  async user (@Arg('filter') filter: UserFilter) {
    if (filter.id) this.repo.findById(filter.id)

    const query = QueryBuilder.entity(UserModel, filter)
      .regex('username', filter.username)
      .eq('email', filter.email)
      .eq('phone', filter.phone)
      .conditions()

    logger.debug('user', { filter, query })
    return this.repo.findOne(query)
  }

  // #endregion

  // #region Mutation

  /**
   * Creates a new user or updates existing one.
   * @param input Input.
   * @param context GraphQL context.
   * @returns User.
   */
  @Mutation(() => User)
  async upsertUser (
    @Arg('data') input: UpsertUserInput,
    @Ctx() { currentUser }: GraphQLContext
  ) {
    logger.debug('upsertUser', { input })
    const { id, password, ...data } = input

    // require a password for new users
    if (!id && !password) {
      throw new UserInputError('PASSWORD_REQUIRED')
    }

    // create a username if not specified
    const username = input.username || (await createUsername(input.name))
    const log = getLog(input, {}, currentUser, ['password'])
    const doc = getDoc<User, UpsertUserInput>(merge({}, data, { username }))
    if (password) doc.password = await hash(password, 10)
    logger.debug('upsertUser', { username, log, doc, password })

    const user = id
      ? await this.repo.updateById(id, doc, log)
      : await this.repo.create(doc, log)

    logger.debug('upsertUser', { user: user.toJSON() })
    return user
  }

  /**
   * Deletes a user.
   * @param input Input.
   * @param context GraphQL context.
   * @returns True if the operation succeeds.
   */
  @Mutation(() => Boolean)
  async deleteUser (
    @Arg('data') input: DeleteUserInput,
    @Ctx() { currentUser }: GraphQLContext
  ) {
    try {
      await this.repo.deleteById(
        input.id,
        getLog(input, undefined, currentUser)
      )

      return true
    } catch (error) {
      return false
    }
  }

  // #endregion
}
