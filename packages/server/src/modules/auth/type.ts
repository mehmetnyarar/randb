import { CookieOptions, Response } from 'express'
import { Field, ID, ObjectType } from 'type-graphql'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/config'
import { User, UserRole, UserToken } from '~/models'
import { EntityOrDocument } from '~/types'
import { AuthTokenPayload } from './types'
import { createAuthToken } from './utility'

/**
 * Current user.
 */
@ObjectType()
export class CurrentUser {
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

  constructor (user: AuthTokenPayload | EntityOrDocument<User>) {
    this.id = user.id
    this.roles = Array.from([...user.roles])
  }

  // #endregion

  // #region Methods

  /**
   *
   */
  setAccessToken () {
    this.accessToken = createAuthToken(this, ACCESS_TOKEN)
  }

  /**
   * Sets the refresh token for the current user.
   */
  setRefreshToken () {
    this.refreshToken = createAuthToken(this, REFRESH_TOKEN)
  }

  /**
   * Creates new authentication tokens for the user.
   */
  setTokens () {
    this.setAccessToken()
    this.setRefreshToken()
  }

  /**
   * Sends authentication cookies to the client.
   * @param res Server response.
   * @param [options] Cookie options.
   */
  sendCookies (res: Response, options: CookieOptions = {}) {
    if (this.accessToken) {
      res.cookie(this.accessToken.name, this.accessToken.value, {
        ...options,
        expires: this.accessToken.expires
      })
    }
    if (this.refreshToken) {
      res.cookie(this.refreshToken.name, this.refreshToken.value, {
        ...options,
        expires: this.refreshToken.expires
      })
    }
  }

  /**
   * Clears the authentication cookies.
   * @param res Server response.
   */
  clearCookies (res: Response) {
    res.clearCookie('access-token')
    res.clearCookie('resfresh-token')
  }

  // #endregion
}
