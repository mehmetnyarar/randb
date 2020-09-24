import { ApolloError } from '@apollo/client'
import { GraphQLError } from 'graphql'
import {
  getCustomError,
  getErrorMessage,
  getExceptionError,
  getGraphQLError
} from '~/error'

describe('error', () => {
  const graphQLErrors = [
    new GraphQLError('GraphQL error 1'),
    new GraphQLError('GraphQL error 2')
  ]

  it('should return app error (exception)', () => {
    const result = getExceptionError(new Error('Exception'))
    expect(result).toEqual({
      type: 'exception',
      messages: ['Exception']
    })
  })

  it('should return app error (custom)', () => {
    const result = getCustomError('nodata')
    expect(result).toEqual({
      type: 'nodata',
      messages: ['nodata']
    })
  })

  it('should return graphql errors', () => {
    const result = getGraphQLError(graphQLErrors)
    expect(result).toEqual({
      type: 'apollo/graphql',
      messages: ['GraphQL error 1', 'GraphQL error 2']
    })
  })

  it('should return apollo error (graphql)', () => {
    const result = getGraphQLError(
      new ApolloError({
        graphQLErrors
      })
    )
    expect(result).toEqual({
      type: 'apollo/graphql',
      messages: ['GraphQL error 1', 'GraphQL error 2']
    })
  })

  it('should return apollo error (network)', () => {
    const result = getGraphQLError(
      new ApolloError({
        networkError: {
          name: 'Network error',
          message: 'Network error'
        }
      })
    )
    expect(result).toEqual({
      type: 'apollo/network',
      messages: ['Network error']
    })
  })

  it('should return apollo error (unknown)', () => {
    const result = getGraphQLError(
      new ApolloError({
        errorMessage: 'Custom error'
      })
    )
    expect(result).toEqual({
      type: 'apollo/unknown',
      messages: ['Custom error']
    })
  })

  it('should return apollo error (no error)', () => {
    const result = getGraphQLError()
    expect(result).toEqual({
      type: 'nodata',
      messages: ['nodata']
    })
  })

  it('should return null (no error)', () => {
    const result = getErrorMessage()
    expect(result).toBeNull()
  })

  it('should return error message', () => {
    const messages = ['Error message 1', 'Error message 2']
    const result = getErrorMessage({ type: 'unspecified', messages })
    expect(result).toBe(messages.join('. '))
  })
})
