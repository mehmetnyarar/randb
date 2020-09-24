import { AppError } from '../../../error'
import { CurrentUser, RequestOrigin, SigninUserInput } from '../../../graphql'
import { HookOptions } from '../../types'

/**
 * Authentication options.
 */
export interface AuthOptions extends HookOptions {
  /**
   * Request origin. Determines the authentication type.
   * Web request are authorized via cookies,
   * while mobile requests are authorized via headers.
   */
  origin?: RequestOrigin
}

/**
 * Authentication context.
 */
export interface AuthContext {
  user?: CurrentUser
  initializing?: boolean
  getCurrentUser: () => void
  currentUserError?: AppError
  loading?: boolean
  signin: (input: SigninUserInput) => Promise<CurrentUser | undefined>
  signinError?: AppError
  signout: () => Promise<boolean>
  signoutError?: AppError
}
