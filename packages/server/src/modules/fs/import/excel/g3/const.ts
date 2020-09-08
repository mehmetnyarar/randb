import { Cell3GBand, Scenario } from '~/models'
import { CellNameRule, ValidationRules } from '../../types'
import { Item } from './types'

/**
 * Validation rules.
 */
export const VALIDATION_RULES: ValidationRules<Item> = {
  'RNC ID': 'numeric',
  'RNC Name': 'falsy',
  LAC: 'numeric',
  'Site ID': undefined,
  'Site Name': 'falsy',
  CI: 'numeric',
  'Cell Name': 'falsy',
  Longitude: 'numeric',
  Latitude: 'numeric',
  'Antenna Type': undefined,
  BeamWidth: 'numeric',
  Height: 'numeric',
  Azimuth: 'numeric',
  'Mechanical Downtilt': 'numeric',
  'Electrical Downtilt': 'numeric',
  PSC: 'numeric',
  'Frequency Band': { oneOf: Object.values(Cell3GBand) },
  ARFCN: 'numeric',
  'Total Power(dBm)': 'numeric',
  'Pilot Power(dBm)': 'numeric',
  'Scenario（Indoor or Outdoor）': { oneOf: Object.values(Scenario) },
  Active: undefined
}

/**
 * Cell name rules.
 */
export const CELL_NAME_RULES: CellNameRule[] = [
  // <site[6]><sector{?}><n{?}>U-<t{?}>
  {
    length: 11,
    site: { start: 0, end: 6 },
    sector: { start: 6, end: 7 },
    n1: { start: 7, end: 8 },
    n2: 10
  },
  // <site[6]><sector{L}><n{???}>U-<t{?}>
  {
    length: 13,
    site: { start: 0, end: 6 },
    sector: { start: 6, end: 7 },
    n1: { start: 7, end: 10 },
    n2: 12
  }
]
