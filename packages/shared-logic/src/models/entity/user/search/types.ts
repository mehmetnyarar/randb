import { UserSearchBy } from './enum'

/**
 * User search box.
 */
export interface UserSearch {
  by: UserSearchBy
  text: string
}
