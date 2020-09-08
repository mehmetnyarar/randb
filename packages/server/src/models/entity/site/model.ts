import { getModelForClass } from '@typegoose/typegoose'
import { Site } from './type'

/**
 * Site model.
 */
export const SiteModel = getModelForClass(Site)
