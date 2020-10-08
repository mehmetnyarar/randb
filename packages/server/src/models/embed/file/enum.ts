import { registerEnumType } from 'type-graphql'

/**
 * File category.
 */
export enum FileCategory {
  NETWORK = 'NETWORK'
}

registerEnumType(FileCategory, { name: 'FileCategory' })
