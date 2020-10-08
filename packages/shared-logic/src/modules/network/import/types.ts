import { NetworkImportInput, NetworkImportReport } from '../../../graphql'
import { FormHookOptions, FormHookResult } from '../../../hooks'

/**
 * Hook options.
 */
export interface UseNetworkImportFormOptions
  extends FormHookOptions<NetworkImportInput, NetworkImportReport> {}

/**
 * Hook result.
 */
export interface UseNetworkImportFormResult
  extends FormHookResult<NetworkImportInput, NetworkImportReport> {}
