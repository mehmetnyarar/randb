import { useState } from 'react'
import { UsersFilter } from '~/graphql'
import { DEFAULT_USERS_FILTER } from './const'
import { SearchContext } from './types'

/**
 * Search hook.
 */
export const useSearch = (): SearchContext => {
  const [users, setUsers] = useState<UsersFilter>(DEFAULT_USERS_FILTER)

  return {
    users,
    setUsers
  }
}
