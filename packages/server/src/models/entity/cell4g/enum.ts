import { registerEnumType } from 'type-graphql'

/**
 * Frequency band for 4G cell.
 */
export enum Cell4GBand {
  FDD1800MHZ10 = '1800 FDD - 10 MHz',
  FDD1800MHZ15 = '1800 FDD - 15 MHz',
  FDD1800MHZ20 = '1800 FDD - 20 MHz'
}

registerEnumType(Cell4GBand, { name: 'Cell4GBand' })
