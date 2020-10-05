import { ElementType, NetworkType } from '../../graphql'

/**
 * Network element.
 */
export interface Ne {
  level?: number
  id: string
  name: string
  type: ElementType
  network?: NetworkType | null
  isActive: boolean
  children?: Ne[]
  isVisible?: boolean
}
