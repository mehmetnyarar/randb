export type AppCustomError = 'auth' | 'nodata' | 'unspecified'
export type AppGraphQLError =
  | 'apollo/graphql'
  | 'apollo/network'
  | 'apollo/unknown'
export type AppErrorType = AppGraphQLError | AppCustomError | 'exception'

/**
 * Application error.
 */
export interface AppError {
  type: AppErrorType
  messages: string[]
}

/**
 * Field error.
 */
export interface FormFieldError {
  message: string
  value?: any
  path?: string
}
