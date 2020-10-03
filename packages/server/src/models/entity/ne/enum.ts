import { registerEnumType } from 'type-graphql'

/**
 * Type of network element.
 */
export enum ElementType {
  BSC = 'BSC',
  RNC = 'RNC',
  TAC = 'TAC',
  LAC = 'LAC',
  SITE = 'SITE',
  CELL = 'CELL'
}

/**
 * Network type.
 */
export enum NetworkType {
  /**
   * GSM.
   */
  G2 = 'G2',
  /**
   * WCDMA.
   */
  G3 = 'G3',
  /**
   * LTE.
   */
  G4 = 'G4'
}

registerEnumType(NetworkType, { name: 'NetworkType' })
registerEnumType(ElementType, { name: 'ElementType' })
