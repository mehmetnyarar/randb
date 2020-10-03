import { CellNameRule, ValidationRules } from '../../types'
import { Item } from './types'

/**
 * Validation rules.
 */
export const VALIDATION_RULES: ValidationRules<Item> = {
  TAC: ['falsy', (value: string) => value === 'G'],
  'Site ID': undefined,
  'Site Name': 'falsy',
  'Cell ID': 'numeric',
  'Cell Name': 'falsy',
  Longitude: 'numeric',
  Latitude: 'numeric',
  'Antenna Type': undefined,
  Height: 'numeric',
  Azimuth: 'numeric',
  'Mechanical Downtilt': 'numeric',
  'Electrical Downtilt': 'numeric',
  PCI: 'numeric',
  'Frequency Band': undefined, // oneOf rule could be applied
  DlEarfcn: 'numeric',
  'DlBandwidth(MHz)': 'numeric',
  'Channel Index': 'numeric',
  'RS Power(dBm)': 'numeric',
  'Max Power(dBm)': 'numeric',
  Scenario: undefined, // oneOf rule could be applied
  Active: undefined
}

/**
 * Cell name rules.
 */
export const CELL_NAME_RULES: CellNameRule[] = [
  // A-<site[6]><sector{?}><n1{?}>L-<n2{?}>
  {
    length: 13,
    site: { start: 2, end: 8 },
    sector: { start: 8, end: 9 },
    n1: { start: 9, end: 10 },
    n2: 12
  }
]
