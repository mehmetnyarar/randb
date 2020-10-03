import { Cell4GBand } from './enum'
import { Cell4G } from './type'

/**
 * Default 4G cell.
 */
export const DEFAULT_G4: Cell4G = {
  pci: 0,
  band: Cell4GBand.FDD1800MHZ10,
  dlEarfcn: 0,
  dlBandwith: 0,
  channelIndex: 0,
  maxPower: 0,
  rsPower: 0
}
