import { isNaN, isNil, toInteger, toNumber } from 'lodash'

/**
 * Determines whether the given value is number or not.
 * @param value Value.
 * @returns True if number.
 */
export const isNumeric = (value: any) => {
  if (isNil(value)) return false

  const n = parseFloat(value)
  if (isNaN(n)) return false

  return true
}

/**
 * Creates a integer number.
 * @param [value] Value.
 * @param [defaultValue=0] Default value to return.
 * @returns Integer.
 */
export const toInt = (value: any, defaultValue = 0) => {
  return isNumeric(value) ? toInteger(value) : defaultValue
}

/**
 * Creates a float number.
 * @param [value] Value.
 * @param [defaultValue=0] Default value to return.
 * @returns Float.
 */
export const toFloat = (value: any, defaultValue = 0) => {
  return isNumeric(value) ? toNumber(value) : defaultValue
}
