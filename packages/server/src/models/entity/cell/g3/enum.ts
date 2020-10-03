import { registerEnumType } from 'type-graphql'

/**
 * Frequency band for 3G cell.
 */
export enum Cell3GBand {
  NONE = 'NONE',
  UMTS900 = 'UMTS900',
  UMTS2100 = 'UMTS2100'
}

registerEnumType(Cell3GBand, { name: 'Cell3GBand' })
