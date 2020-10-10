import { Logger, storage } from '@app/logic'
import { useCallback, useEffect, useState } from 'react'
import { ColorPalette, ColorScheme } from '../types'
import { getColorPalette } from '../utility'
import { DEFAULT_SCHEME } from './const'
import { ThemeContext } from './types'

const logger = Logger.create({
  src: 'theme'
})

/**
 * Creates a theme context.
 */
export const useTheme = (): ThemeContext => {
  const [ready, setReady] = useState(false)
  const [scheme, setScheme] = useState<ColorScheme>(DEFAULT_SCHEME)
  const [palette, setPalette] = useState<ColorPalette>(getColorPalette(scheme))
  const onSchemeChange = useCallback(async (value = DEFAULT_SCHEME) => {
    await storage.set('scheme', value)
    setScheme(value)
    setPalette(getColorPalette(value))
  }, [])

  useEffect(() => {
    async function restore () {
      const value = await storage.get<ColorScheme>('scheme')
      logger.debug('restore', { value })
      onSchemeChange(value)
      setReady(true)
    }

    restore()
  }, [onSchemeChange])

  return {
    ready,
    scheme,
    palette,
    onSchemeChange
  }
}
