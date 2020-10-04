import { NetworkElementsFilter, UsersFilter } from '../../graphql'

/**
 * Search context.
 */
export interface SearchContext {
  users: UsersFilter
  setUsers: (filter: UsersFilter) => void
  network: NetworkElementsFilter
  setNetwork: (filter: NetworkElementsFilter) => void
}
