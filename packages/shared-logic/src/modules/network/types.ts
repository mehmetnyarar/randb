import { SelectState } from '../../form'
import { ElementType, NetworkType } from '../../graphql'

/**
 * Network element.
 */
export interface Ne {
  level?: number
  title?: string
  id: string
  name: string
  type: ElementType
  network?: NetworkType | null
  isActive: boolean
  children?: Ne[]
  state?: SelectState
  isCurrent?: boolean
  isVisible?: boolean
  areChildrenVisible?: boolean
}

/**
 * Options for Ne.
 */
export interface NeOptions {
  query?: string
  current?: Ne
  selected?: Ne[]
}
