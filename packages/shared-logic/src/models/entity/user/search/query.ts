import { merge } from 'lodash'
import { UsersFilter } from '../../../../graphql'
import { UserSearchBy } from './enum'
import { UserSearch } from './types'

/**
 * Creates a filter from user search.
 * @param search User search.
 * @returns User filter.
 */
const getUserSearchFilter = ({ by, text }: UserSearch): UsersFilter => {
  switch (by) {
    case UserSearchBy.USERNAME:
      return { username: text }
    case UserSearchBy.FIRST_NAME:
      return { name: { first: text } }
    case UserSearchBy.LAST_NAME:
      return { name: { last: text } }
    case UserSearchBy.EMAIL:
      return { email: text }
    default:
      return {}
  }
}

/**
 * Creates a query to find users.
 * @param search User search.
 * @param filter Advance filters.
 * @returns User filter.
 */
export const getUserFilter = (search: UserSearch, filter: UsersFilter = {}) => {
  return merge({}, getUserSearchFilter(search), filter)
}
