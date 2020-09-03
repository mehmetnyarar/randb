import { getModelForClass } from '@typegoose/typegoose'
import { Log } from './type'

/**
 * Log model.
 */
export const LogModel = getModelForClass(Log)
