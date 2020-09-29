import { UsersFilter } from '../../graphql'
import { SearchContext } from './types'

/**
 * Default users filter.
 */
export const DEFAULT_USERS_FILTER: UsersFilter = {}

/**
 * Default search context.
 */
export const DEFAULT_SEARCH: SearchContext = {
  users: DEFAULT_USERS_FILTER,
  setUsers: () => {
    throw new Error('search/setUsers has not been yet implemented!')
  }
}
