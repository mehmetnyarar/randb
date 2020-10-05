import { getLocation, getPersonName, getPhoneNumber } from '../models'
import { getYesNo } from './boolean'
import { getDateString } from './date'

/**
 * Stringifies values.
 */
export const stringify = {
  date: getDateString,
  location: getLocation,
  personName: getPersonName,
  phoneNo: getPhoneNumber,
  yesNo: getYesNo
}
