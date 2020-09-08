import { CreateQuery, Types } from 'mongoose'
import { DEFAULT_CELL } from '../cell'
import { Cell3GBand } from './enum'
import { Cell3G } from './type'

/**
 * Default 3G cell.
 */
export const DEFAULT_CELL3G: CreateQuery<Cell3G> = {
  ...DEFAULT_CELL,
  rnc: Types.ObjectId(),
  lac: Types.ObjectId(),
  psc: 0,
  band: Cell3GBand.UMTS2100,
  arfcn: 0,
  totalPower: 0,
  pilotPower: 0
}
