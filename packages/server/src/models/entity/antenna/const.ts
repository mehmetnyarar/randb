import { CreateQuery } from 'mongoose'
import { Antenna } from './type'

/**
 * Default antenna.
 */
export const DEFAULT_ANTENNA: CreateQuery<Antenna> = {
  name: '',
  beamwidth: 65,
  isActive: true
}
