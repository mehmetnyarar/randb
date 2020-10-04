import { useCallback, useEffect, useState } from 'react'
import { AppError, getCustomError, getGraphQLError } from '../../error'
import {
  Bsc,
  NetworkType,
  Rnc,
  Tac,
  useBSCsLazyQuery,
  useRNCsLazyQuery,
  useTACsLazyQuery
} from '../../graphql'
import { HookOptions, HookResult } from '../../hooks'
import { Logger } from '../../logger'
import { Ne } from './types'
import { getNe } from './utility'

const logger = Logger.create({
  src: 'topology'
})

/**
 * Options for topology hook.
 */
export interface UseTopologyOptions extends HookOptions {
  /**
   * If true, queries will be made to the api
   * any time network has changed.
   * If false, existing topology will be used.
   */
  keepFresh?: boolean
}

/**
 * Result of topology hook.
 */
export interface UseTopologyResult extends HookResult<Ne[]> {
  network: NetworkType
  onNetworkChange: (value: NetworkType) => void
  query: string
  onQueryChange: (value: string) => void
}

/**
 * Topology hook.
 */
export const useTopology = (options: UseTopologyOptions) => {
  const { keepFresh = false } = options

  const [error, setError] = useState<AppError>()
  const [result, setResult] = useState<Ne[]>([])
  const [loading, setLoading] = useState(false)

  const [query, setQuery] = useState('')
  const onQueryChange = useCallback(
    (value = '') => {
      setQuery(value)
      setResult(result.map(item => getNe(item as Ne, value)))
    },
    [result]
  )

  const [bscs, setBscs] = useState<Bsc[]>([])
  const [getBscs] = useBSCsLazyQuery({
    nextFetchPolicy: 'network-only',
    onError: e => {
      console.warn({ e })
      logger.debug('getBscs/onError', { e })
      setError(getGraphQLError(e))
      setLoading(false)
    },
    onCompleted: data => {
      console.warn({ data: JSON.stringify(data, null, 2) })
      logger.debug('getBscs/onCompleted', { data })
      if (data && data.bscs) {
        const items = data.bscs as Bsc[]
        setBscs(items)
        setResult(items.map(item => getNe(item as Ne)))
      } else setError(getCustomError('nodata'))
      setLoading(false)
    }
  })

  const [rncs, setRncs] = useState<Rnc[]>([])
  const [getRncs] = useRNCsLazyQuery({
    nextFetchPolicy: 'network-only',
    onError: e => {
      logger.debug('getRncs/onError', { e })
      setError(getGraphQLError(e))
      setLoading(false)
    },
    onCompleted: data => {
      logger.debug('getRncs/onCompleted', { data })
      if (data && data.rncs) {
        const items = data.rncs as Rnc[]
        setRncs(items)
        setResult(items.map(item => getNe(item as Ne)))
      } else setError(getCustomError('nodata'))
      setLoading(false)
      setQuery('')
    }
  })

  const [tacs, setTacs] = useState<Tac[]>([])
  const [getTacs] = useTACsLazyQuery({
    nextFetchPolicy: 'network-only',
    onError: e => {
      logger.debug('getTacs/onError', { e })
      setError(getGraphQLError(e))
      setLoading(false)
    },
    onCompleted: data => {
      logger.debug('getTacs/onCompleted', { data })
      if (data && data.tacs) {
        const items = data.tacs as Tac[]
        setTacs(items)
        setResult(items.map(item => getNe(item as Ne)))
      } else setError(getCustomError('nodata'))
      setLoading(false)
      setQuery('')
    }
  })

  const [network, setNetwork] = useState(NetworkType.G2)
  const onNetworkChange = useCallback(
    (value: NetworkType) => {
      setQuery('')
      setNetwork(value)
      console.log('onNetworkChange', { value, keepFresh, bscs, rncs, tacs })

      if (value === NetworkType.G2) {
        if (keepFresh || !bscs.length) {
          console.log('onNetworkChange/getBscs')
          setLoading(true)
          getBscs()
        } else {
          setResult(bscs.map(item => getNe(item as Ne)))
        }
      } else if (value === NetworkType.G3) {
        if (keepFresh || !rncs.length) {
          console.log('onNetworkChange/getRncs')
          setLoading(true)
          getRncs()
        } else {
          setResult(rncs.map(item => getNe(item as Ne)))
        }
      } else if (value === NetworkType.G4) {
        if (keepFresh || !tacs.length) {
          console.log('onNetworkChange/getTacs')
          setLoading(true)
          getTacs()
        } else {
          setResult(tacs.map(item => getNe(item as Ne)))
        }
      }
    },
    [keepFresh, bscs, getBscs, rncs, getRncs, tacs, getTacs]
  )

  useEffect(() => {
    setLoading(true)
    getBscs()
  }, [getBscs])

  return {
    error,
    result,
    loading,
    network,
    onNetworkChange,
    query,
    onQueryChange
  }
}
