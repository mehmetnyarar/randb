import { CellData } from '../../types'

/**
 * 3G cell data.
 */
export interface Item extends CellData {
  'RNC ID'?: number
  'RNC Name'?: string
  LAC?: number
  'Site ID'?: string
  'Site Name'?: string
  CI?: string
  'Cell Name'?: string
  Longitude?: number
  Latitude?: number
  'Antenna Type'?: string
  BeamWidth?: number
  Height?: number
  Azimuth?: number
  'Mechanical Downtilt'?: number
  'Electrical Downtilt'?: number
  PSC?: string
  'Frequency Band'?: string
  ARFCN?: string
  'Total Power(dBm)'?: number
  'Pilot Power(dBm)'?: number
  'Scenario（Indoor or Outdoor）'?: string
  Active?: boolean
}
