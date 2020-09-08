import { getModelForClass } from '@typegoose/typegoose'
import { Cell3G } from './type'

/**
 * Model for 3G cell.
 */
export const Cell3GModel = getModelForClass(Cell3G)
