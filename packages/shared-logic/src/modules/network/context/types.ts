import { NetworkType } from '../../../graphql'
import { HookOptions, HookResult } from '../../../hooks'
import { Ne } from '../types'

/**
 * Network context.
 */
export interface NetworkContext extends HookResult<Ne[]> {
  network: NetworkType
  onNetworkChange: (value: NetworkType) => void
  query: string
  onQueryChange: (value: string) => void
  reload: (value?: NetworkType) => void
  selectedItem?: Ne
  onSelectItem: (value: Ne) => void
}

/**
 * Network options.
 */
export interface NetworkOptions extends HookOptions {}
