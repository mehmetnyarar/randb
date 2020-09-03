import { registerEnumType } from 'type-graphql'

/**
 * Type of entity.
 */
export enum EntityType {
  LOG = 'LOG',
  USER = 'USER'
}

registerEnumType(EntityType, { name: 'EntityType' })
