import { UserSearchBy } from './enum'
import { UserSearch } from './types'

/**
 * Default user search.
 */
export const DEFAULT_USER_SEARCH: UserSearch = {
  by: UserSearchBy.USERNAME,
  text: ''
}
