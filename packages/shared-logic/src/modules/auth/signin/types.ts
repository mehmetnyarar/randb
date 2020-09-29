import { CurrentUser, SigninUserInput } from '../../../graphql'
import { FormHookOptions, FormHookResult } from '../../../hooks'

/**
 * Indicates how the user prefers to signin.
 */
export type SigninMethod = 'email' | 'phone'

/**
 * Hook options.
 */
export interface UseSigninFormOptions
  extends FormHookOptions<SigninUserInput, CurrentUser> {}

/**
 * Hook result.
 */
export interface UseSigninFormResult
  extends FormHookResult<SigninUserInput, CurrentUser> {
  method: SigninMethod
  altMethod: SigninMethod
  onMethodChange: (method?: SigninMethod) => void
  isPasswordVisible: boolean
  onTogglePasswordVisibility: () => void
}
