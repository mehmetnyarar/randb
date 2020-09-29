import { createContext } from 'react'
import { DEFAULT_SEARCH } from './const'
import { SearchContext } from './types'

/**
 * Search context.
 */
export const Search = createContext<SearchContext>(DEFAULT_SEARCH)
