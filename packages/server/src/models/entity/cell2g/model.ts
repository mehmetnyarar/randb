import { getModelForClass } from '@typegoose/typegoose'
import { Cell2G } from './type'

/**
 * Model for 2G cell.
 */
export const Cell2GModel = getModelForClass(Cell2G)
