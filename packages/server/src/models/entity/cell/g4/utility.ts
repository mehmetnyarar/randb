import { Cell4GBand } from './enum'

/**
 * Determines the band a of a 4G cell.
 * @param value Value.
 * @returns 4G cell band.
 */
export const to4GBand = (value = '') => {
  if (value.includes('10')) return Cell4GBand.FDD1800MHZ10
  if (value.includes('15')) return Cell4GBand.FDD1800MHZ15
  if (value.includes('20')) return Cell4GBand.FDD1800MHZ20
  return Cell4GBand.NONE
}
