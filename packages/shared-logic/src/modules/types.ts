import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormMethods
} from 'react-hook-form'
import { AppError } from '../error'
import { AnalyticsInput } from '../graphql'

/**
 * Hook options.
 */
export interface HookOptions extends AnalyticsInput {}

/**
 * Form hook options.
 */
export interface FormHookOptions<Values, Result> extends HookOptions {
  initialValues?: Partial<Values>
  onSuccess?: (result: Result) => any | Promise<any>
  onFailure?: (error: AppError) => any | Promise<any>
}

/**
 * Result of a form hook.
 */
export interface FormHookResult<Values extends AnalyticsInput, Result>
  extends UseFormMethods<Values> {
  TypedController: any
  isDisabled: boolean
  onInvalid: SubmitErrorHandler<Values>
  onValid: SubmitHandler<Values>
  loading?: boolean
  result?: Result
  error?: AppError
}
