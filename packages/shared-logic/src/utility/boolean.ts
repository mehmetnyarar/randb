/**
 * Stringifies a boolean value as yes or no.
 * @param [value] Value.
 * @returns Stringified boolean.
 */
export const getYesNo = (value?: boolean): string => {
  return value ? 'yes' : 'no'
}
