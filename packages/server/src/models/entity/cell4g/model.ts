import { getModelForClass } from '@typegoose/typegoose'
import { Cell4G } from './type'

/**
 * Model for 4G cell.
 */
export const Cell4GModel = getModelForClass(Cell4G)
