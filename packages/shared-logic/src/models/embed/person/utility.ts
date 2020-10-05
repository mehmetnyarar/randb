import { PersonName } from '../../../graphql'

export interface PersonNameOptions {
  first?: boolean
  last?: boolean
}

/**
 * Creates a stringified person name.
 * @param [name] Person name.
 * @param [options] Options.
 * @returns Stringified person name.
 */
export const getPersonName = (
  name?: PersonName,
  options: PersonNameOptions = {}
) => {
  if (!name) return ''

  const { first = true, last = true } = options

  if (first && last) return `${name.first} ${name.last}`
  else if (first) return name.first
  return name.last
}
