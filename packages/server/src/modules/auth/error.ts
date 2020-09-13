import { ApolloError } from 'apollo-server-express'

/**
 * Error message.
 */
export type AuthErrorMessage =
  | 'USER_NOT_FOUND'
  | 'WRONG_PASSWORD'
  | 'RESET_PASSWORD'

/**
 * Error stack.
 */
export interface AuthErrorStack {
  /**
   * Operation.
   */
  operation: 'SIGNIN'
}

/**
 * Error meta.
 */
export interface AuthErrorMeta extends AuthErrorStack {
  /**
   * Original error.
   */
  error?: Error
}

export class AuthError extends ApolloError {
  constructor (message: AuthErrorMessage, meta: AuthErrorMeta) {
    super(message, 'UNAUTHENTICATED') // AuthenticationError

    const { error, ...stack } = meta
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' })
    Object.defineProperty(this, 'stack', { value: JSON.stringify(stack) })
    Object.defineProperty(this, 'originalError', { value: error })
  }
}
