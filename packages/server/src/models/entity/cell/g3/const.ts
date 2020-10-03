import { Cell3GBand } from './enum'
import { Cell3G } from './type'

/**
 * Default 3G cell.
 */
export const DEFAULT_G3: Cell3G = {
  psc: 0,
  band: Cell3GBand.UMTS2100,
  arfcn: 0,
  totalPower: 0,
  pilotPower: 0
}
