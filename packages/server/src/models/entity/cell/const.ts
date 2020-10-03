import { CreateQuery, Types } from 'mongoose'
import { GeometryType } from '~/models/embed'
import { DEFAULT_NETWORK_ELEMENT, ElementType, NetworkType } from '../ne'
import { Scenario } from './enum'
import { DEFAULT_G2 } from './g2'
import { DEFAULT_G3 } from './g3'
import { DEFAULT_G4 } from './g4'
import { Cell } from './type'

/**
 * Default cell.
 */
export const DEFAULT_CELL: CreateQuery<Cell> = {
  ...DEFAULT_NETWORK_ELEMENT,
  type: ElementType.CELL,
  site: Types.ObjectId(),
  location: {
    type: GeometryType.Point,
    coordinates: []
  },
  sector: '',
  height: 0,
  azimuth: 0,
  antenna: undefined,
  electricalTilt: 0,
  mechanicalTilt: 0,
  scenario: Scenario.OUTDOOR
}

/**
 * Default 2G cell.
 */
export const DEFAULT_CELL2G: CreateQuery<Cell> = {
  ...DEFAULT_CELL,
  network: NetworkType.G2,
  g2: DEFAULT_G2
}

/**
 * Default 3G cell.
 */
export const DEFAULT_CELL3G: CreateQuery<Cell> = {
  ...DEFAULT_CELL,
  network: NetworkType.G3,
  g3: DEFAULT_G3
}

/**
 * Default 4G cell.
 */
export const DEFAULT_CELL4G: CreateQuery<Cell> = {
  ...DEFAULT_CELL,
  network: NetworkType.G4,
  g4: DEFAULT_G4
}
