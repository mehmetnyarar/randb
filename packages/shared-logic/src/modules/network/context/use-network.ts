import { useCallback, useEffect, useState } from 'react'
import { AppError, getCustomError, getGraphQLError } from '../../../error'
import {
  Bsc,
  NetworkType,
  Rnc,
  Tac,
  useBSCsLazyQuery,
  useRNCsLazyQuery,
  useTACsLazyQuery
} from '../../../graphql'
import { Logger } from '../../../logger'
import { Ne } from '../types'
import { getNe } from '../utility'
import { NetworkContext } from './types'

const logger = Logger.create({
  src: 'network'
})

/**
 * Network hook.
 */
export const useNetwork = (): NetworkContext => {
  const [error, setError] = useState<AppError>()
  const [result, setResult] = useState<Ne[]>([])
  const [loading, setLoading] = useState(false)

  const [query, setQuery] = useState('')
  const onQueryChange = useCallback(
    (value = '') => {
      setQuery(value)

      if (result.length) {
        setResult(result.map(item => getNe(item as Ne, value)))
      }
    },
    [result]
  )

  const [bscs, setBscs] = useState<Bsc[]>([])
  const [getBscs] = useBSCsLazyQuery({
    nextFetchPolicy: 'network-only',
    onError: e => {
      logger.debug('getBscs/onError', { e })
      setError(getGraphQLError(e))
      setLoading(false)
    },
    onCompleted: data => {
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
    }
  })

  const [network, setNetwork] = useState(NetworkType.G2)

  const reload = useCallback(
    (value?: NetworkType) => {
      const type = value || network
      setLoading(true)

      switch (type) {
        case NetworkType.G2:
          getBscs()
          break
        case NetworkType.G3:
          getRncs()
          break
        case NetworkType.G4:
          getTacs()
          break
        default:
          setLoading(false)
          break
      }
    },
    [network, getBscs, getRncs, getTacs]
  )

  const onNetworkChange = useCallback(
    (value: NetworkType) => {
      setQuery('')
      setNetwork(value)
      logger.debug('onNetworkChange', { value, bscs, rncs, tacs })

      if (value === NetworkType.G2) {
        if (bscs.length) setResult(bscs.map(item => getNe(item as Ne)))
        else reload(NetworkType.G2)
      } else if (value === NetworkType.G3) {
        if (rncs.length) setResult(rncs.map(item => getNe(item as Ne)))
        else reload(NetworkType.G3)
      } else if (value === NetworkType.G4) {
        if (tacs.length) setResult(tacs.map(item => getNe(item as Ne)))
        else reload(NetworkType.G4)
      }
    },
    [bscs, rncs, tacs, reload]
  )

  const [selectedItem, setSelectedItem] = useState<Ne>()
  const onSelectItem = useCallback((value: Ne) => {
    setSelectedItem(value)
  }, [])

  useEffect(reload, [reload])

  return {
    error,
    result,
    loading,
    network,
    onNetworkChange,
    query,
    onQueryChange,
    reload,
    selectedItem,
    onSelectItem
  }
}
