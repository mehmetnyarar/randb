import { registerEnumType } from 'type-graphql'

/**
 * Frequency band for 4G cell.
 */
export enum Cell4GBand {
  NONE = 'NONE',
  FDD1800MHZ10 = 'FDD1800MHZ10',
  FDD1800MHZ15 = 'FDD1800MHZ15',
  FDD1800MHZ20 = 'FDD1800MHZ20'
}

registerEnumType(Cell4GBand, { name: 'Cell4GBand' })
