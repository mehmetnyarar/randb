import { UpsertUserInput, User } from '../../../../graphql'
import { FormHookOptions, FormHookResult } from '../../../../hooks'

/**
 * Hook options.
 */
export interface UseUpsertUserFormOptions
  extends FormHookOptions<UpsertUserInput, User> {}

/**
 * Hook result.
 */
export interface UseUpsertUserFormResult
  extends FormHookResult<UpsertUserInput, User> {
  create?: boolean
  isCreated?: boolean
  password: string
  createPassword: () => void
  isPasswordVisible: boolean
  onTogglePasswordVisibility: () => void
}
