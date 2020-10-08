import { SelectState } from '../../form'
import { ElementType } from '../../graphql'
import { Ne, NeOptions } from './types'

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
 * Determines the selection state of an NE
 * based on whether it is in the selected list or not.
 * @param id ID.
 * @param selected Selection.
 * @returns Selection state.
 */
const getSelfState = (id: string, selected: Ne[]) => {
  const ne = selected.find(e => id === e.id)
  return ne ? SelectState.SELECTED : SelectState.UNSELECTED
}

/**
 * Determines the selection state of an NE
 * based on the states of its children.
 * @param children Children.
 * @returns Selection state.
 */
const getStateFromChildren = (children: Ne[]) => {
  const selected = children.filter(e => e.state !== SelectState.UNSELECTED)

  if (selected.length === children.length) return SelectState.SELECTED
  return selected.length > 0
    ? SelectState.INDETERMINATE
    : SelectState.UNSELECTED
}

/**
 * Determines the state of an NE
 * based on its self state and the state from its children.
 * @param self Self state.
 * @param children State from children.
 * @returns Selection state.
 */
const getNeState = (self: SelectState, children: SelectState) => {
  if (self === SelectState.SELECTED) {
    return children === SelectState.SELECTED
      ? SelectState.SELECTED
      : SelectState.INDETERMINATE
  }

  return children
}

/**
 * Creates NE from a parent network element.
 * @param element Network element.
 * @param [options] Options.
 * @returns NE.
 */
export const getNe = (element: Ne, options: NeOptions = {}) => {
  const { query, current, selected = [] } = options
  const { id, name, type } = element

  const level = getNeLevel(type)
  const isCurrent = id === current?.id
  const selfState = getSelfState(id, selected)
  const selfVisible = isNeVisible(name, query)

  let state = selfState
  const children = element.children
    ? element.children.map(e => getNe(e, options))
    : undefined

  let visibleChildren = 0
  let areChildrenVisible = false

  if (children) {
    const stateFormChildren = getStateFromChildren(children)
    state = getNeState(selfState, stateFormChildren)
    visibleChildren = children.filter(e => e.isVisible === true).length
    areChildrenVisible =
      visibleChildren > 0 && selfState !== SelectState.UNSELECTED
  }

  const isVisible = selfVisible || visibleChildren > 0
  const title = visibleChildren ? `${name} (${visibleChildren})` : name
  const ne: Ne = {
    level,
    title,
    id: element.id,
    name: element.name,
    type: element.type,
    network: element.network,
    isActive: element.isActive,
    children,
    state,
    isCurrent,
    isVisible,
    areChildrenVisible
  }

  return ne
}

/**
 * Creates a NE list.
 * @params elements Network elements.
 * @params [options] Options.
 * @returns NE list.
 */
export const getNeList = (elements: Ne[], options: NeOptions = {}) => {
  return elements.map(element => getNe(element as Ne, options))
}
