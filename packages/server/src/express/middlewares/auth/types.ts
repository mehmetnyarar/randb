import { CurrentUser } from '~/modules'

/**
 * Result of a token validation.
 */
export interface Token {
  user?: CurrentUser

  refresh?: boolean

  expired?: boolean
}
