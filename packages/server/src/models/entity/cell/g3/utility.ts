import { Cell3GBand } from './enum'

/**
 * Determines the band a of a 3G cell.
 * @param value Value.
 * @returns 3G cell band.
 */
export const to3GBand = (value = '') => {
  if (value.includes('900')) return Cell3GBand.UMTS900
  if (value.includes('2100')) return Cell3GBand.UMTS2100
  return Cell3GBand.NONE
}
