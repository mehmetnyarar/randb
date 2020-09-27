import { omit } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import {
  AppError,
  getCustomError,
  getExceptionError,
  getGraphQLError
} from '../../../error'
import {
  CurrentUser,
  RequestOrigin,
  SigninUserInput,
  useCurrentUserLazyQuery,
  useSigninUserMutation,
  useSignoutUserMutation
} from '../../../graphql'
import { Logger } from '../../../logger'
import { storage } from '../../../storage'
import { AuthContext, AuthOptions } from './types'

const logger = Logger.create({
  src: 'auth'
})

/**
 * Creates an authentication context.
 * @param [options] Options.
 */
export const useAuth = (options: AuthOptions = {}): AuthContext => {
  const { ...analytics } = options

  const [skip, setSkip] = useState(false)
  const onSkipChange = useCallback((value: boolean) => setSkip(value), [])

  const [user, setUser] = useState<CurrentUser>()
  const [loading, setLoading] = useState(false)

  const [initializing, setInitializing] = useState(true)
  const [currentUserError, setCurrentUserError] = useState<AppError>()
  const [getCurrentUser] = useCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
    onError: error => {
      logger.error('getCurrentUser/onError', error)
      setCurrentUserError(getGraphQLError(error))
      setInitializing(false)
    },
    onCompleted: data => {
      logger.debug('getCurrentUser/onCompleted', { data })
      if (!data) setCurrentUserError(getCustomError('nodata'))
      else if (data.currentUser) setUser(data.currentUser)
      setInitializing(false)
    }
  })

  const [signinError, setSigninError] = useState<AppError>()
  const [signinUser, { client: signinUserClient }] = useSigninUserMutation()
  const signin = useCallback(
    async (input: SigninUserInput) => {
      setLoading(true)
      let currentUser: CurrentUser | undefined

      try {
        const { data, errors } = await signinUser({
          variables: {
            data: {
              ...input,
              ...analytics
            }
          }
        })

        if (data && data.signinUser) currentUser = data.signinUser
        else setSigninError(getGraphQLError(errors))
      } catch (ex) {
        setSigninError(getExceptionError(ex))
      } finally {
        if (currentUser) {
          // save tokens to local storage
          if (analytics.origin === RequestOrigin.MOBILE) {
            await storage.set('access-token', currentUser.accessToken)
            await storage.set('refresh-token', currentUser.refreshToken)
          }

          // reset apollo client
          signinUserClient.resetStore()

          // update user
          setUser(omit(currentUser, ['accessToken', 'refreshToken']))
        }

        setLoading(false)
      }

      return currentUser
    },
    [analytics, signinUser, signinUserClient]
  )

  const [signoutError, setSignoutError] = useState<AppError>()
  const [signoutUser, { client: signoutUserClient }] = useSignoutUserMutation()
  const signout = useCallback(async () => {
    setLoading(true)
    let success = false

    try {
      const { data, errors } = await signoutUser({
        variables: {
          data: analytics
        }
      })

      success = (data && data.signoutUser) || !errors
      if (errors) setSignoutError(getGraphQLError(errors))
    } catch (ex) {
      setSignoutError(getExceptionError(ex))
    } finally {
      if (success) {
        // remove tokens from the local storage
        if (analytics.origin === RequestOrigin.MOBILE) {
          await storage.remove('access-token')
          await storage.remove('refresh-token')
        }

        // reset apollo client
        await signoutUserClient.resetStore()

        // update user
        setUser(undefined)
      }

      setLoading(false)
    }

    return success
  }, [analytics, signoutUser, signoutUserClient])

  // Query the current user on load
  useEffect(getCurrentUser, [getCurrentUser])

  return {
    skip,
    onSkipChange,
    user,
    initializing,
    getCurrentUser,
    currentUserError,
    loading,
    signin,
    signinError,
    signout,
    signoutError
  }
}
