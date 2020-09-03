import { getModelForClass } from '@typegoose/typegoose'
import { User } from './type'

/**
 * User model.
 */
export const UserModel = getModelForClass(User)
