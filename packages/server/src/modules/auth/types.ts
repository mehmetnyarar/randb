import { UserToken } from '~/models'
import { CurrentUser } from '..'

/**
 * Token configuration.
 * @see env/*_TOKEN
 */
export interface TokenConfig {
  /**
   * Token name.
   */
  name: string

  /**
   * Token secret.
   */
  secret: string

  /**
   * Token expiry.
   * @see https://github.com/vercel/ms
   */
  expiry: number
}

/**
 * Payload to create a reset token.
 */
export interface ResetTokenPayload {
  /**
   * Authentication code.
   */
  code: string

  /**
   * Expiry date.
   */
  expiry: string | Date
}

/**
 * Payload to create auth tokens.
 */
export type AuthTokenPayload = Pick<CurrentUser, 'id' | 'roles'>

/**
 * Auth token configurations.
 */
export interface AuthTokenConfig {
  accessToken: TokenConfig
  refreshToken: TokenConfig
}

/**
 * Authentication tokens.
 */
export interface AuthToken {
  accessToken?: UserToken
  refreshToken?: UserToken
}
