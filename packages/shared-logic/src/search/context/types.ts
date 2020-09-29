import { UsersFilter } from '../../graphql'

/**
 * Search context.
 */
export interface SearchContext {
  users: UsersFilter
  setUsers: (filter: UsersFilter) => void
}
