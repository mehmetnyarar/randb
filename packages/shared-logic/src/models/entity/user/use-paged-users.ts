import { merge } from 'lodash'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AppError, getCustomError, getGraphQLError } from '../../../error'
import {
  ConnectionInput,
  usePagedUsersLazyQuery,
  UserConnection,
  UsersFilter
} from '../../../graphql'
import { FindFn, NextFn, PagedHookResult } from '../../../hooks'
import { Logger } from '../../../logger'
import { Search } from '../../../search'

const logger = Logger.create({
  src: 'users'
})

// constants
const DEFAULT_CONNECTION: ConnectionInput = { first: 10 }

// types
export interface UsePagedUsersResult
  extends PagedHookResult<UserConnection, UsersFilter> {}

/**
 * Hook for pagedUsers query.
 */
export const usePagedUsers = (): UsePagedUsersResult => {
  const { users: filter } = useContext(Search)

  const [initializing, setInitializing] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<UserConnection>()
  const [error, setError] = useState<AppError>()

  const [getUsers] = usePagedUsersLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: data => {
      logger.debug('onCompleted', { data })
      if (!data || !data.pagedUsers) setError(getCustomError('nodata'))
      else setResult(data.pagedUsers as UserConnection)
      initializing && setInitializing(false)
      loading && setLoading(false)
    },
    onError: e => {
      logger.debug('onError', { e })
      setError(getGraphQLError(e))
      initializing && setInitializing(false)
      loading && setLoading(false)
    }
  })

  const find = useCallback<FindFn<UsersFilter>>(async () => {
    setLoading(true)

    getUsers({
      variables: {
        filter,
        connection: DEFAULT_CONNECTION
      }
    })
  }, [getUsers, filter])

  const next = useCallback<NextFn>(async () => {
    if (!result) return

    const { endCursor } = result.pageInfo
    getUsers({
      variables: {
        filter,
        connection: merge(DEFAULT_CONNECTION, {
          after: endCursor
        })
      }
    })
  }, [getUsers, filter, result])

  // Find users
  useEffect(() => {
    find()
  }, [find])

  return {
    initializing,
    loading,
    result,
    error,
    find,
    next
  }
}
