import { useCallback, useEffect, useState } from 'react'
import {
  AppError,
  getCustomError,
  getExceptionError,
  getGraphQLError
} from '../../../error'
import {
  Bsc,
  NetworkElementReport,
  NetworkType,
  Rnc,
  Tac,
  useBSCsLazyQuery,
  useDeleteCellMutation,
  useDeleteSiteMutation,
  useRNCsLazyQuery,
  useTACsLazyQuery
} from '../../../graphql'
import { Logger } from '../../../logger'
import { getNeStats } from '../reporter'
import { getNe, getNeList } from '../topology'
import { Ne } from '../types'
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
  const [current, setCurrent] = useState<Ne>()
  const [selected, setSelected] = useState<Ne[]>([])

  const onQueryChange = useCallback(
    (value = '') => {
      setQuery(value)

      if (result.length) {
        setResult(
          result.map(item =>
            getNe(item as Ne, {
              query: value,
              current,
              selected
            })
          )
        )
      }
    },
    [result, current, selected]
  )

  const onSelectItem = useCallback(
    (value: Ne, checked?: Boolean) => {
      const _current = checked ? value : undefined
      const _selected = _current
        ? [_current, ...selected]
        : selected.filter(e => e.id !== value.id)
      const _result = getNeList(result, {
        query,
        current: _current,
        selected: _selected
      })

      setResult(_result)
      setCurrent(_current)
      setSelected(_selected)
    },
    [result, query, selected]
  )

  const [bscs, setBscs] = useState<Bsc[]>([])
  const [getBscs] = useBSCsLazyQuery({
    fetchPolicy: 'network-only',
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
        setResult(getNeList(items, { current, selected }))
      } else setError(getCustomError('nodata'))
      setLoading(false)
    }
  })

  const [rncs, setRncs] = useState<Rnc[]>([])
  const [getRncs] = useRNCsLazyQuery({
    fetchPolicy: 'network-only',
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
        setResult(getNeList(items, { current, selected }))
      } else setError(getCustomError('nodata'))
      setLoading(false)
    }
  })

  const [tacs, setTacs] = useState<Tac[]>([])
  const [getTacs] = useTACsLazyQuery({
    fetchPolicy: 'network-only',
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
        setResult(getNeList(items, { current, selected }))
      } else setError(getCustomError('nodata'))
      setLoading(false)
    }
  })

  const [network, setNetwork] = useState(NetworkType.G2)
  const reload = useCallback(
    (value: NetworkType) => {
      setLoading(true)
      setNetwork(value)

      switch (value) {
        case NetworkType.G2:
          return getBscs()
        case NetworkType.G3:
          return getRncs()
        case NetworkType.G4:
          return getTacs()
        default:
          return () => setLoading(false)
      }
    },
    [getBscs, getRncs, getTacs]
  )
  const onNetworkChange = useCallback(
    (value: NetworkType) => {
      setQuery('')
      setNetwork(value)
      logger.debug('onNetworkChange', { value, bscs, rncs, tacs })

      if (value === NetworkType.G2) {
        if (bscs.length) {
          setResult(getNeList(bscs, { current, selected }))
        } else reload(NetworkType.G2)
      } else if (value === NetworkType.G3) {
        if (rncs.length) {
          setResult(getNeList(rncs, { current, selected }))
        } else reload(NetworkType.G3)
      } else if (value === NetworkType.G4) {
        if (tacs.length) {
          setResult(getNeList(tacs, { current, selected }))
        } else reload(NetworkType.G4)
      }
    },
    [reload, bscs, rncs, tacs, current, selected]
  )

  const [deleteSite] = useDeleteSiteMutation()
  const onDeleteSite = useCallback(
    async (id: string, callback?: () => void) => {
      try {
        const { data, errors } = await deleteSite({
          variables: { data: { id } }
        })
        if (data && data.deleteSite) {
          reload(network)
          if (callback) callback()
        } else setError(getGraphQLError(errors))
      } catch (ex) {
        logger.debug('deleteSite/ex', ex)
        setError(getExceptionError(ex))
      }
    },
    [deleteSite, reload, network]
  )

  const [deleteCell] = useDeleteCellMutation()
  const onDeleteCell = useCallback(
    async (id: string, callback?: () => void) => {
      try {
        const { data, errors } = await deleteCell({
          variables: { data: { id } }
        })
        if (data && data.deleteCell) {
          reload(network)
          if (callback) callback()
        } else setError(getGraphQLError(errors))
      } catch (ex) {
        logger.debug('deleteCell/ex', ex)
        setError(getExceptionError(ex))
      }
    },
    [deleteCell, reload, network]
  )

  useEffect(() => reload(network), [reload, network])

  const [neStats, setNeStats] = useState<NetworkElementReport>({})
  useEffect(() => {
    setNeStats(getNeStats(network, result))
  }, [network, result])

  return {
    error,
    result,
    loading,
    network,
    onNetworkChange,
    reload,
    query,
    onQueryChange,
    current,
    setCurrent,
    selected,
    onSelectItem,
    neStats,
    onDeleteSite,
    onDeleteCell
  }
}
