import { NetworkElementReport, NetworkType } from '../../../graphql'
import { HookOptions, HookResult } from '../../../hooks'
import { Ne } from '../types'

/**
 * Network context.
 */
export interface NetworkContext extends HookResult<Ne[]> {
  neStats: NetworkElementReport
  network: NetworkType
  onNetworkChange: (value: NetworkType) => void
  reload: (value: NetworkType) => void
  query: string
  onQueryChange: (value: string) => void
  current?: Ne
  setCurrent: (value: Ne) => void
  selected: Ne[]
  onSelectItem: (value: Ne, checked?: boolean) => void
  onDeleteSite: (id: string, callback?: () => void) => void | Promise<void>
  onDeleteCell: (id: string, callback?: () => void) => void | Promise<void>
}

/**
 * Network options.
 */
export interface NetworkOptions extends HookOptions {}
