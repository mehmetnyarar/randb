import React from 'react'
import { Search } from './context'
import { useSearch } from './use'

interface Props {}

/**
 * Search provider.
 * @param props Props.
 */
export const SearchProvider: React.FC<Props> = ({ children }) => {
  const search = useSearch()
  return <Search.Provider value={search}>{children}</Search.Provider>
}
