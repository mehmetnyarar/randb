import { getModelForClass } from '@typegoose/typegoose'
import { Cell } from './type'

/**
 * Cell model.
 */
export const CellModel = getModelForClass(Cell)
