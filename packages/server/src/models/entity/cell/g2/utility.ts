import { Cell2GBand } from './enum'

/**
 * Determines the band a of a 2G cell.
 * @param value Value.
 * @returns 2G cell band.
 */
export const to2GBand = (value = '') => {
  if (value.includes('GSM') || value.includes('900')) return Cell2GBand.GSM900
  if (value.includes('DCS') || value.includes('1800')) return Cell2GBand.DCS1800
  return Cell2GBand.NONE
}
