import { CreateQuery } from 'mongoose'
import {
  DEFAULT_PERSON_NAME,
  DEFAULT_PHONE_NUMBER,
  PersonGender
} from '~/models/embed'
import { User } from './type'

/**
 * Default user.
 */
export const DEFAULT_USER: CreateQuery<User> = {
  username: '',
  name: DEFAULT_PERSON_NAME,
  email: '',
  phone: DEFAULT_PHONE_NUMBER,
  gender: PersonGender.UNSPECIFIED,
  birthday: undefined,
  location: undefined,
  locations: [],
  auth: 0,
  roles: [],
  password: '',
  oldPasswords: [],
  signinFailures: 0,
  isActive: false
}
