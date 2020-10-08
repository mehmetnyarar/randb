import { CellData } from '../../types'

/**
 * 4G cell data.
 */
export interface Item extends CellData {
  TAC?: string
  'Site ID'?: string
  'Site Name'?: string
  'Cell ID'?: string
  'Cell Name'?: string
  Longitude?: number
  Latitude?: number
  'Antenna Type'?: string
  Height?: number
  Azimuth?: number
  'Mechanical Downtilt'?: number
  'Electrical Downtilt'?: number
  PCI?: string
  'Frequency Band'?: string
  DlEarfcn?: string
  'DlBandwidth(MHz)'?: number
  'Channel Index'?: number
  'RS Power(dBm)'?: number
  'Max Power(dBm)'?: number
  Scenario?: string
  Active?: boolean
}
