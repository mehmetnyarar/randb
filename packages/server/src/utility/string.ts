import { customAlphabet } from 'nanoid'

/**
 * Creates a string by slicing the value
 * @param [value] String value.
 * @param [size=3] Number of chars.
 * @returns String.
 */
export const slice = (value?: string, size = 3) => {
  if (!value) return ''

  const end = size > value.length ? value.length : size
  return value.slice(0, end)
}

/**
 * Alphabet for custom NanoID generation.
 */
export type AlphabetType = 'lower' | 'upper' | 'numeric'

/**
 * Alphabets.
 */
const alphabets: Record<AlphabetType, string> = {
  lower: 'abcdefghijklmnopqrstuvwyz',
  upper: 'ABCDEFGHIJKLMOPQRSTUVWXYZ',
  numeric: '1234567890'
}

/**
 * Creates a random string.
 * @param size Number of chars.
 * @param types Alphabets to use.
 * @param custom Custom alphabets to add.
 * @returns String.
 */
export const getRandomString = (
  size: number,
  types: AlphabetType[],
  custom: string[] = []
) => {
  if (!types.length) {
    throw new Error('Please specify alphabets to use!')
  }

  return customAlphabet(
    types
      .reduce<string[]>((arr, type) => arr.concat(alphabets[type]), [])
      .concat(custom)
      .join(''),
    size
  )
}
