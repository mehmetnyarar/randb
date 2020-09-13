import { Field, ID, ObjectType } from 'type-graphql'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/config'
import { User, UserRole, UserToken } from '~/models'
import { EntityOrDocument } from '~/types'
import { AuthToken, AuthTokenConfig, AuthTokenPayload } from './types'
import { createAuthToken, getTokenConfig } from './utility'

/**
 * Current user.
 */
@ObjectType()
export class CurrentUser implements AuthToken {
  // #region Properties

  @Field(() => ID)
  id: string

  @Field(() => [UserRole])
  roles: UserRole[]

  @Field(() => UserToken, { nullable: true })
  accessToken?: UserToken

  @Field(() => UserToken, { nullable: true })
  refreshToken?: UserToken

  // #endregion

  // #region Constructor

  /**
   * Initializes a new instance of CurrentUser.
   * @param user User.
   * @param [config] Auth token configuration.
   */
  constructor (user: AuthTokenPayload | EntityOrDocument<User>) {
    this.id = user.id
    this.roles = Array.from([...user.roles])
  }

  // #endregion

  // #region Methods

  /**
   * Creates new authentication tokens for the user.
   * @param [config] COnfiguration.
   */
  setTokens (config: Partial<AuthTokenConfig> = {}) {
    const {
      accessToken = getTokenConfig(ACCESS_TOKEN),
      refreshToken = getTokenConfig(REFRESH_TOKEN)
    } = config

    this.accessToken = createAuthToken(this, accessToken)
    this.refreshToken = createAuthToken(this, refreshToken)
  }

  // #endregion
}
