import { BetweenOptions } from './types'

/**
 * Default options for the $between filter.
 */
export const BETWEEN: BetweenOptions = {
  min: true,
  max: false
}

/**
 * Regular expressions for string sanitization.
 */
export const SANITIZE: Record<'default' | 'email', RegExp> = {
  default: /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g,
  email: /[!"#$%&'()*,/:;<=>?[\]^`{|}~]/g
}
