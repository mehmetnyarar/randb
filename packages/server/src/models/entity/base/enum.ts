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
  CELL2G = 'CELL2G',
  CELL3G = 'CELL3G',
  CELL4G = 'CELL4G',
  LAC = 'LAC',
  RNC = 'RNC',
  SITE = 'SITE',
  TAC = 'TAC'
}

registerEnumType(EntityType, { name: 'EntityType' })
