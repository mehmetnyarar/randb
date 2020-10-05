import { useEffect, useState } from 'react'
import { AppError, getCustomError, getGraphQLError } from '../../../error'
import { cleanup, Site, useSiteLazyQuery } from '../../../graphql'
import { HookOptions, HookResult } from '../../../hooks'
import { Logger } from '../../../logger'

const logger = Logger.create({
  src: 'site'
})

export interface UseSiteOptions extends HookOptions {
  name: string
}
export interface UseSiteResult extends HookResult<Site> {}

export const useSite = (options: UseSiteOptions): UseSiteResult => {
  const { name } = options

  const [error, setError] = useState<AppError>()
  const [result, setResult] = useState<Site>()
  const [loading, setLoading] = useState(false)

  const [getSite] = useSiteLazyQuery({
    fetchPolicy: 'network-only',
    onError: e => {
      logger.debug('getSite/onError', { e })
      setError(getGraphQLError(e))
      setLoading(false)
    },
    onCompleted: data => {
      logger.debug('getSite/onCompleted', { data })
      if (data && data.site) setResult(cleanup(data.site as Site))
      else setError(getCustomError('nodata'))
      setLoading(false)
    }
  })

  useEffect(() => {
    getSite({
      variables: {
        filter: {
          name
        }
      }
    })
  }, [name, getSite])

  return {
    error,
    result,
    loading
  }
}
