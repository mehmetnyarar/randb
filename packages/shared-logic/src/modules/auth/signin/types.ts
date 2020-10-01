import { CurrentUser, SigninMethod, SigninUserInput } from '../../../graphql'
import { FormHookOptions, FormHookResult } from '../../../hooks'

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
  otherMethods: SigninMethod[]
  onMethodChange: (value: SigninMethod) => void
  isPasswordVisible: boolean
  onTogglePasswordVisibility: () => void
}
