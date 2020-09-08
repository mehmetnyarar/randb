import { CellData } from '../../types'

/**
 * 2G cell data.
 */
export interface Item extends CellData {
  'BSC ID'?: number
  'BSC Name'?: string
  LAC?: number
  'Site ID'?: string
  'Site Name'?: string
  CI?: number
  'Cell Name'?: string
  Longitude?: number
  Latitude?: number
  'Antenna Type'?: string
  Height?: number
  Azimuth?: number
  'Mechanical Downtilt'?: number
  'Electrical Downtilt'?: number
  MCC?: number
  MNC?: number
  NCC?: string
  BCC?: string
  'Frequency Band'?: string
  BCCH?: string
  'TRX Number'?: number
  'TRX Power(dBm'?: number
  'Scenario（Indoor or Outdoor）'?: string
}
