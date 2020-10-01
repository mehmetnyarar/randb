import { merge } from 'lodash'
import { useCallback, useContext, useEffect, useState } from 'react'
import {
  AppError,
  getCustomError,
  getExceptionError,
  getGraphQLError
} from '../../../error'
import {
  ConnectionInput,
  useDeleteUserMutation,
  usePagedUsersLazyQuery,
  UserConnection,
  UsersFilter
} from '../../../graphql'
import {
  FindFn,
  NextFn,
  PagedHookResult,
  SearchHookResult
} from '../../../hooks'
import { Logger } from '../../../logger'
import { Search } from '../../../search'
import {
  DEFAULT_USER_SEARCH,
  getUserFilter,
  UserSearch,
  UserSearchBy
} from './search'

const logger = Logger.create({
  src: 'users'
})

// constants
const DEFAULT_CONNECTION: ConnectionInput = { first: 10 }

// types
export interface UsePagedUsersResult
  extends PagedHookResult<UserConnection, UsersFilter>,
    SearchHookResult<UsersFilter, UserSearch, UserSearchBy> {}

/**
 * Hook for pagedUsers query.
 */
export const usePagedUsers = (): UsePagedUsersResult => {
  const { users: filter, setUsers: updateFilter } = useContext(Search)

  const [initializing, setInitializing] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<UserConnection>()
  const [error, setError] = useState<AppError>()

  const [getItems] = usePagedUsersLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: data => {
      logger.debug('getItems/onCompleted', { data })
      if (!data || !data.pagedUsers) setError(getCustomError('nodata'))
      else setResult(data.pagedUsers as UserConnection)
      initializing && setInitializing(false)
      loading && setLoading(false)
    },
    onError: e => {
      logger.debug('getItems/onError', { e })
      setError(getGraphQLError(e))
      initializing && setInitializing(false)
      loading && setLoading(false)
    }
  })

  const [search, setSearch] = useState(DEFAULT_USER_SEARCH)
  const onSearchByChange = useCallback(
    (by: UserSearchBy) => {
      setSearch(merge({}, search, { by }))
    },
    [search]
  )
  const onSearchTextChange = useCallback(
    (text: string) => {
      setSearch(merge({}, search, { text }))
    },
    [search]
  )

  const [advanceSearch, setAdvanceSearch] = useState(false)
  const toggleAdvanceSearch = useCallback(() => {
    setAdvanceSearch(!advanceSearch)
  }, [advanceSearch])

  const autofind = useCallback<FindFn<UsersFilter>>(async () => {
    setLoading(true)
    getItems({
      variables: {
        filter: getUserFilter(search, filter),
        connection: DEFAULT_CONNECTION
      }
    })
  }, [getItems, filter, search])
  const find = useCallback<FindFn<UsersFilter>>(
    async value => {
      setLoading(true)
      getItems({
        variables: {
          filter: value,
          connection: DEFAULT_CONNECTION
        }
      })
    },
    [getItems]
  )
  const next = useCallback<NextFn>(async () => {
    if (!result) return

    const { endCursor } = result.pageInfo
    getItems({
      variables: {
        filter,
        connection: merge(DEFAULT_CONNECTION, {
          after: endCursor
        })
      }
    })
  }, [getItems, filter, result])

  const [deleteItem] = useDeleteUserMutation()
  const onDelete = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await deleteItem({
          variables: {
            data: {
              id
            }
          }
        })
        if (data && data.deleteUser) find()
        else setError(getGraphQLError(errors))
      } catch (ex) {
        logger.debug('onDelete/ex', { ex })
        setError(getExceptionError(ex))
      }
    },
    [deleteItem, find]
  )

  // Search for items on load
  useEffect(() => {
    find()
  }, [find])

  return {
    initializing,
    loading,
    result,
    error,
    find,
    next,
    updateFilter,
    filter,
    search,
    onSearchByChange,
    onSearchTextChange,
    advanceSearch,
    toggleAdvanceSearch,
    autofind,
    onDelete
  }
}
