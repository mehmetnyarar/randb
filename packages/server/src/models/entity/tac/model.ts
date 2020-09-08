import { getModelForClass } from '@typegoose/typegoose'
import { Tac } from './type'

/**
 * TAC model.
 */
export const TacModel = getModelForClass(Tac)
