import { Bsc, ElementType, NetworkType, Rnc, Tac } from '../../graphql'

/**
 * Type of parent network element.
 */
export type ParentNe = Bsc | Rnc | Tac

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
