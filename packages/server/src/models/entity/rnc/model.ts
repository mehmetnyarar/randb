import { getModelForClass } from '@typegoose/typegoose'
import { Rnc } from './type'

/**
 * RNC model.
 */
export const RncModel = getModelForClass(Rnc)
