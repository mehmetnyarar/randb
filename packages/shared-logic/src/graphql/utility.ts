import { getMainDefinition } from '@apollo/client/utilities'
import { ReactNativeFile } from 'apollo-upload-client'
import { isPlainObject } from 'lodash'
import { omitDeep } from '../utility'

/**
 * Cleans up a GraphQL object.
 * @param data Data.
 * @param [fields] Fields to remove.
 * @returns Data.
 */
export function cleanup<T> (data: T, fields: string[] = []): T {
  if (!data) return data

  const exclude = fields.concat('__typename')
  return omitDeep(data, exclude)
}

/**
 * Determines whether the value is a file upload or not.
 * @param value Value.
 * @returns True if the conditions are met.
 */
const isFile = (value: any): boolean => {
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
