import { ElementType } from '../../graphql'
import { Ne } from './types'

/**
 * Determines the level of the network element.
 * @param type Type of network element.
 * @returns Element level.
 */
export const getNeLevel = (type: ElementType) => {
  switch (type) {
    case ElementType.CELL:
      return 2
    case ElementType.SITE:
      return 1
    default:
      return 0
  }
}

/**
 * Determines whether NE is visible or not.
 * @param name Name.
 * @param query Query.
 * @returns True if there is no query or the name matches with the query.
 */
export const isNeVisible = (name: string, query?: string) => {
  if (!query) return true

  const re = new RegExp(query, 'i')
  const matches = name.match(re)

  return Boolean(matches)
}

/**
 * Creates NE from a parent network element.
 * @param element Network element.
 * @returns NE.
 */
export const getNe = (element: Ne, query?: string): Ne => {
  const level = getNeLevel(element.type)
  const children =
    element.children && element.children.map(e => getNe(e, query))
  const visibleChildren = children && children.filter(e => e.isVisible === true)
  const areChildrenVisible = Boolean(visibleChildren?.length)
  const isSelfVisible = isNeVisible(element.name, query)
  const isVisible = isSelfVisible || areChildrenVisible

  return {
    level,
    id: element.id,
    name: element.name,
    type: element.type,
    network: element.network,
    isActive: element.isActive,
    children,
    isVisible
  }
}
