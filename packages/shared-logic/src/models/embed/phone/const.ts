import { PhoneNumberInput } from '../../../graphql'

/**
 * Phone number RegEx.
 */
export const phoneNumberRegex: Record<keyof PhoneNumberInput, RegExp> = {
  cc: /^[0-9]{1,3}$/,
  dc: /^[0-9]{3}$/,
  sn: /^[0-9]{7}$/
}
