import { NetworkType } from '../../../graphql'
import { NetworkContext } from './types'

/**
 * Default network context.
 */
export const DEFAULT_NETWORK: NetworkContext = {
  network: NetworkType.G2,
  onNetworkChange: () => {
    throw new Error('network/onNetworkChange has not been yet implemented!')
  },
  reload: () => {
    throw new Error('network/reload has not been yet implemented!')
  },
  query: '',
  onQueryChange: () => {
    throw new Error('network/onQueryChange has not been yet implemented!')
  },
  current: undefined,
  setCurrent: () => {
    throw new Error('network/setCurrent has not been yet implemented!')
  },
  selected: [],
  onSelectItem: () => {
    throw new Error('network/onSelectItem has not been yet implemented!')
  }
}
