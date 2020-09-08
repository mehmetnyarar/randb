import { CreateQuery, Types } from 'mongoose'
import { Scenario } from './enum'
import { Cell } from './type'

/**
 * Default cell.
 */
export const DEFAULT_CELL: CreateQuery<Cell> = {
  site: Types.ObjectId(),
  sector: '',
  ID: '',
  name: '',
  height: 0,
  azimuth: 0,
  antenna: undefined,
  electricalTilt: 0,
  mechanicalTilt: 0,
  scenario: Scenario.OUTDOOR,
  isActive: true
}
