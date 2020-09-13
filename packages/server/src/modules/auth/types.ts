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
 * Payload for access/refresh token.
 */
export type AuthTokenPayload = Pick<CurrentUser, 'id' | 'roles'>
