import { registerEnumType } from 'type-graphql'

/**
 * Frequency band for 3G cell.
 */
export enum Cell3GBand {
  UMTS900 = 'UMTS 900',
  UMTS2100 = 'UMTS 2100'
}

registerEnumType(Cell3GBand, { name: 'Cell3GBand' })
