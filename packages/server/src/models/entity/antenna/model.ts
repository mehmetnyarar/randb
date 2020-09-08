import { getModelForClass } from '@typegoose/typegoose'
import { Antenna } from './type'

/**
 * Antenna model.
 */
export const AntennaModel = getModelForClass(Antenna)
