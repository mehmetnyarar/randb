import { getMainDefinition } from '@apollo/client/utilities'
import { ReactNativeFile } from 'apollo-upload-client'
import { isPlainObject } from 'lodash'
import { storage } from '../storage'
import { AuthTokens } from './types'

/**
 * Returns authentication token by reading them from the local storage.
 * @returns Authentication tokens.
 */
export const getAuthTokensFromStorage = async (): Promise<AuthTokens> => {
  return {
    accessToken: await storage.get('access-token'),
    refreshToken: await storage.get('refresh-token')
  }
}

/**
 * Creates a bearer token.
 * @param [fromStorage=false] Read tokens from the storage?
 * @param [auth] Default tokens.
 * @returns Bearer token.
 */
export const getBearerToken = async (
  fromStorage = false,
  auth: AuthTokens = {}
) => {
  const { accessToken, refreshToken } = fromStorage
    ? await getAuthTokensFromStorage()
    : auth

  const token = accessToken || refreshToken
  return token ? (token.includes('Bearer') ? token : `Bearer ${token}`) : ''
}

/**
 * Determines whether the value is a file upload or not.
 * @param value Value.
 * @returns True if the conditions are met.
 */
export const isFile = (value: any): boolean => {
  if (isPlainObject(value) || Array.isArray(value)) {
    return Object.values(value).map(isFile).includes(true)
  }

  const isfile = typeof File !== 'undefined' && value instanceof File
  const isblob = typeof Blob !== 'undefined' && value instanceof Blob
  const isrnfile = value instanceof ReactNativeFile

  return isfile || isblob || isrnfile
}

/**
 * Determines whether the link contains a file upload or not.
 * @param params Params.
 * @returns True if the conditions are met.
 */
export const isUpload = ({ variables }: any) => {
  return Object.values(variables).some(isFile)
}

/**
 * Determines whether the link is GraphQL subscription or not.
 * @param params Params.
 * @returns True if the conditions are met.
 */
export const isSubscription = ({ query }: any) => {
  const { kind, operation }: any = getMainDefinition(query)
  return kind === 'OperationDefinition' && operation === 'subscription'
}
