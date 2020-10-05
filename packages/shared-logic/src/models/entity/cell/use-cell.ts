import { useEffect, useState } from 'react'
import { AppError, getCustomError, getGraphQLError } from '../../../error'
import { Cell, cleanup, useCellLazyQuery } from '../../../graphql'
import { HookOptions, HookResult } from '../../../hooks'
import { Logger } from '../../../logger'

const logger = Logger.create({
  src: 'cell'
})

export interface UseCellOptions extends HookOptions {
  name: string
}
export interface UseCellResult extends HookResult<Cell> {}

export const useCell = (options: UseCellOptions): UseCellResult => {
  const { name } = options

  const [error, setError] = useState<AppError>()
  const [result, setResult] = useState<Cell>()
  const [loading, setLoading] = useState(false)

  const [getCell] = useCellLazyQuery({
    fetchPolicy: 'network-only',
    onError: e => {
      logger.debug('getCell/onError', { e })
      setError(getGraphQLError(e))
      setLoading(false)
    },
    onCompleted: data => {
      logger.debug('getCell/onCompleted', { data })
      if (data && data.cell) setResult(cleanup(data.cell as Cell))
      else setError(getCustomError('nodata'))
      setLoading(false)
    }
  })

  useEffect(() => {
    getCell({
      variables: {
        filter: {
          name
        }
      }
    })
  }, [name, getCell])

  return {
    error,
    result,
    loading
  }
}
