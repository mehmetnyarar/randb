import { PhoneNumberInput } from './input'
import { PhoneNumber } from './type'

/**
 * Stringifies phone number.
 * @param phone Phone number.
 * @returns Stringified phone number.
 */
export const getPhoneNumber = (phone: PhoneNumber) => {
  return `+${phone.cc}${phone.dc}${phone.sn}`
}

/**
 * Determines whether the phone number is default or not.
 * @param [phone] Phone number.
 * @returns True if the phone number is undefined or has default values.
 */
export const isDefaultPhoneNumber = (phone?: Partial<PhoneNumberInput>) => {
  if (!phone) return true
  return !phone.cc && !phone.dc && !phone.sn
}
