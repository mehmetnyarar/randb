import { ApolloError } from '@apollo/client'
import { GraphQLError } from 'graphql'
import { get } from 'lodash'
import { FieldError } from 'react-hook-form'
import { AppCustomError, AppError, FormFieldError } from './types'

/**
 * Creates an application error from an exception.
 * @param exception Exception.
 * @returns Application error.
 */
export const getExceptionError = (exception: Error): AppError => {
  return {
    type: 'exception',
    messages: [exception.message]
  }
}

/**
 * Creates a custom application error.
 * @param [type='unspecified'] Error type.
 * @param [messages] Messages.
 * @returns Application error.
 */
export const getCustomError = (
  type: AppCustomError = 'unspecified',
  messages?: string[]
): AppError => {
  return {
    type,
    messages: messages || [type]
  }
}

/**
 * Creates an application error by parsing GraphQL errors.
 * @param errors Errors.
 * @returns Application error.
 */
const getGraphQLErrors = (errors: GraphQLError[]): AppError => {
  return {
    type: 'apollo/graphql',
    messages: errors.map(error => {
      return error.message
    })
  }
}

/**
 * Creates an application error by parsing Apollo error.
 * @param errors Errors.
 * @returns Application error.
 */
const getApolloError = (error: ApolloError): AppError => {
  const { graphQLErrors } = error
  if (graphQLErrors && graphQLErrors.length) {
    return getGraphQLErrors([...graphQLErrors])
  }

  const { networkError } = error
  if (networkError) {
    return {
      type: 'apollo/network',
      messages: [networkError.message]
    }
  }

  return {
    type: 'apollo/unknown',
    messages: [error.message]
  }
}

/**
 * Creates an application error.
 * @param error Error.
 * @returns Application error.
 */
export const getGraphQLError = (
  error?: ApolloError | readonly GraphQLError[],
  type: AppCustomError = 'nodata',
  messages?: string[]
): AppError => {
  console.log('getGraphQLError', { error })
  return error
    ? Array.isArray(error)
      ? getGraphQLErrors([...error])
      : getApolloError(error as ApolloError)
    : getCustomError(type, messages)
}

/**
 * Returns error message.
 * @param error Application error.
 * @returns Error message.
 */
export const getErrorMessage = (error?: AppError | null) => {
  if (!error) return null
  return error.messages.join('. ')
}

/**
 * Gets the field error.
 * @param error Error.
 * @returns Field error.
 */
export const getFieldError = (error?: any) => {
  if (!error) return undefined

  // Get the error message:
  // could be either string or FieldError
  const message =
    typeof error === 'string'
      ? error
      : get<FieldError, 'message'>(error, 'message')

  // Error message should be a string
  if (!message || typeof message !== 'string') return undefined

  const e: FormFieldError = { message }

  // path separator
  const p = e.message.split('/')
  if (p.length > 1) {
    e.message = p[0]
    e.path = p[1]
  }

  // value separator
  const v = e.message.split('=')
  if (v.length > 1) {
    e.message = v[0]
    e.value = v[1]
  }

  return e
}
