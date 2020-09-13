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
 * @param phone Phone number.
 * @returns True if the phone number is default.
 */
export const isDefaultPhoneNumber = ({ cc, dc, sn }: PhoneNumberInput) => {
  return !cc && !dc && !sn
}
