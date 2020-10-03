import { registerEnumType } from 'type-graphql'

/**
 * Type of entity.
 */
export enum EntityType {
  // Base Entities
  LOG = 'LOG',
  USER = 'USER',

  // Network Entities
  ANTENNA = 'ANTENNA',
  BSC = 'BSC',
  RNC = 'RNC',
  TAC = 'TAC',
  LAC = 'LAC',
  SITE = 'SITE',
  CELL = 'CELL'
}

registerEnumType(EntityType, { name: 'EntityType' })
