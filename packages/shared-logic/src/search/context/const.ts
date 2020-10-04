import { NetworkElementsFilter, UsersFilter } from '../../graphql'
import { SearchContext } from './types'

/**
 * Default users filter.
 */
export const DEFAULT_USERS_FILTER: UsersFilter = {}

/**
 * Default NE filter.
 */
export const DEFAULT_NETWORK_FILTER: NetworkElementsFilter = {}

/**
 * Default search context.
 */
export const DEFAULT_SEARCH: SearchContext = {
  users: DEFAULT_USERS_FILTER,
  setUsers: () => {
    throw new Error('search/setUsers has not been yet implemented!')
  },
  network: DEFAULT_NETWORK_FILTER,
  setNetwork: () => {
    throw new Error('search/setUsers has not been yet implemented!')
  }
}
