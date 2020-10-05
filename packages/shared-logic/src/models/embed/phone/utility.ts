import { PhoneNumber } from '../../../graphql'

/**
 * Stringifies a phone number.
 * @param [phone] Phone number.
 * @returns Stringified phone number.
 */
export const getPhoneNumber = (phone?: PhoneNumber) => {
  return phone ? `+${phone.cc}${phone.dc}${phone.sn}` : ''
}
