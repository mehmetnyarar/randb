import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormMethods
} from 'react-hook-form'
import { AppError } from '../error'
import { AnalyticsInput, ConnectionInput } from '../graphql'

/**
 * Hook options.
 */
export interface HookOptions extends AnalyticsInput {}

/**
 * Hook result.
 */
export interface HookResult<Result> {
  initializing?: boolean
  loading?: boolean
  result?: Result
  error?: AppError
}

export type FindFn<Filter> = (filter?: Filter) => void | Promise<void>
export type NextFn = (connection?: ConnectionInput) => void | Promise<void>

/**
 * Search hook.
 */
export interface SearchHookResult<Filter, Search, SearchBy> {
  updateFilter: (value: Filter) => void
  filter: Filter
  search: Search
  onSearchByChange: (value: SearchBy) => void
  onSearchTextChange: (value: string) => void
  advanceSearch: boolean
  toggleAdvanceSearch: () => void
  autofind: () => void | Promise<void>
}

/**
 * Paging hook result.
 */
export interface PagedHookResult<Result, Filter> extends HookResult<Result> {
  find: FindFn<Filter>
  next: NextFn
  onDelete: (id: string) => void | Promise<void>
}

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
  extends HookResult<Result>,
    UseFormMethods<Values> {
  TypedController: any
  isDisabled: boolean
  onInvalid: SubmitErrorHandler<Values>
  onValid: SubmitHandler<Values>
}
