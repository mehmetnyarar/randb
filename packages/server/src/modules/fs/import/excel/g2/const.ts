import { CellNameRule, ValidationRules } from '../../types'
import { Item } from './types'

/**
 * Validation rules.
 */
export const VALIDATION_RULES: ValidationRules<Item> = {
  'BSC ID': undefined,
  'BSC Name': 'falsy',
  LAC: 'numeric',
  'Site ID': undefined,
  'Site Name': 'falsy',
  CI: 'numeric',
  'Cell Name': 'falsy',
  Longitude: 'numeric',
  Latitude: 'numeric',
  'Antenna Type': undefined,
  Height: 'numeric',
  Azimuth: 'numeric',
  'Mechanical Downtilt': 'numeric',
  'Electrical Downtilt': 'numeric',
  MCC: 'numeric',
  MNC: 'numeric',
  NCC: 'numeric',
  BCC: 'numeric',
  'Frequency Band': undefined, // oneOf rule could be applied
  BCCH: 'numeric',
  'TRX Number': 'numeric',
  'TRX Power(dBm': 'numeric',
  'Scenario（Indoor or Outdoor）': undefined // oneOf rule could be applied
}

/**
 * Cell name rules.
 */
export const CELL_NAME_RULES: CellNameRule[] = [
  // <site[6]><sector{?}><n{?}>G-<t{?}>
  {
    length: 11,
    site: { start: 0, end: 6 },
    sector: { start: 6, end: 7 },
    n1: { start: 7, end: 8 },
    n2: 10
  },
  // A-<site[6]><sector{?}><n{?}>G-<t{?}>
  {
    length: 13,
    site: { start: 2, end: 8 },
    sector: { start: 8, end: 9 },
    n1: { start: 9, end: 10 },
    n2: 12
  }
]
