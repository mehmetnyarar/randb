import { useState } from 'react'
import { NetworkElementsFilter, UsersFilter } from '~/graphql'
import { DEFAULT_NETWORK_FILTER, DEFAULT_USERS_FILTER } from './const'
import { SearchContext } from './types'

/**
 * Search hook.
 */
export const useSearch = (): SearchContext => {
  const [users, setUsers] = useState<UsersFilter>(DEFAULT_USERS_FILTER)
  const [network, setNetwork] = useState<NetworkElementsFilter>(
    DEFAULT_NETWORK_FILTER
  )

  return {
    users,
    setUsers,
    network,
    setNetwork
  }
}
