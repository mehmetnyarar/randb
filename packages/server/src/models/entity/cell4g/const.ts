import { CreateQuery, Types } from 'mongoose'
import { DEFAULT_CELL } from '../cell'
import { Cell4GBand } from './enum'
import { Cell4G } from './type'

/**
 * Default 4G cell.
 */
export const DEFAULT_CELL4G: CreateQuery<Cell4G> = {
  ...DEFAULT_CELL,
  tac: Types.ObjectId(),
  pci: 0,
  band: Cell4GBand.FDD1800MHZ10,
  dlEarfcn: 0,
  dlBandwith: 0,
  channelIndex: 0,
  maxPower: 0,
  rsPower: 0
}
