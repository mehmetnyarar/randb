import { ColorScheme, Theme } from '@app/ui'
import { IndexPath, Select, SelectItem } from '@ui-kitten/components'
import React, { useCallback, useContext, useMemo } from 'react'

// types
interface ThemeOption {
  id: number
  scheme: ColorScheme
}

// constans
const schemes: ColorScheme[] = ['light', 'dark']
const themes = schemes.map<ThemeOption>((scheme, id) => ({
  id,
  scheme
}))

/**
 * Theme selection.
 */
export const ThemeSelection: React.FC = () => {
  const { scheme, onSchemeChange } = useContext(Theme)
  const selectedIndex = useMemo(
    () => themes.findIndex(theme => theme.scheme === scheme),
    [scheme]
  )
  const selectedTheme = useMemo(() => new IndexPath(selectedIndex), [
    selectedIndex
  ])
  const onThemeChange = useCallback(
    (index: IndexPath | IndexPath[]) => {
      if (!Array.isArray(index)) {
        const theme = themes.find(t => t.id === index.row)
        if (theme) onSchemeChange(theme.scheme)
      }
    },
    [onSchemeChange]
  )

  return (
    <Select
      selectedIndex={selectedTheme}
      onSelect={onThemeChange}
      value={themes[selectedIndex].scheme}
      size='small'
      style={{ minWidth: 125 }}
      accessibilityHint='Change the theme'
    >
      {themes.map(theme => (
        <SelectItem key={theme.id} title={theme.scheme} />
      ))}
    </Select>
  )
}
