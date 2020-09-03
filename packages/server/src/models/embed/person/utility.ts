import { PersonName } from './type'

/**
 * Stringifies person name.
 * @param name Person name.
 * @returns Stringified person name.
 */
export const getPersonName = (name: PersonName) => {
  return `${name.first} ${name.last}`
}
