import { registerEnumType } from 'type-graphql'

/**
 * Frequency band for 2G cell.
 */
export enum Cell2GBand {
  GSM900 = 'GSM900',
  DCS1800 = 'DCS1800'
}

registerEnumType(Cell2GBand, { name: 'Cell2GBand' })
