import { Cell2GBand } from './enum'
import { Cell2G } from './type'

/**
 * Default 2G cell.
 */
export const DEFAULT_G2: Cell2G = {
  mcc: 0,
  mnc: 0,
  ncc: 0,
  bcc: 0,
  band: Cell2GBand.GSM900,
  bcch: 0,
  trxNumber: 0,
  trxPower: 0
}
