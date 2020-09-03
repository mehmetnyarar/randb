import { PhoneNumber } from './type'

/**
 * Stringifies phone number.
 * @param phone Phone number.
 * @returns Stringified phone number.
 */
export const getPhoneNumber = (phone: PhoneNumber) => {
  return `+${phone.cc}${phone.dc}${phone.sn}`
}
