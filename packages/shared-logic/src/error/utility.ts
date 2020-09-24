import { ApolloError } from '@apollo/client'
import { GraphQLError } from 'graphql'
import { AppCustomError, AppError } from './types'

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
