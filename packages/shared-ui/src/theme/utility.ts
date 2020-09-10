import { schemes } from './palette'
import { ColorPalette, ColorScheme } from './types'

/**
 * Determines whether the value is CSS color or not.
 * @param [value] Color value.
 * @returns True if CSS color (hex or rgba).
 */
export const isCssColor = (value?: string) => {
  return Boolean(value && (value.includes('#') || value.includes('rgba')))
}

/**
 * Determines whether the value is a mapped color or nor.
 * @param [value] Color value.
 * @returns True if mapped color.
 */
export const isMappedColor = (value?: string) => {
  return Boolean(value && (value.includes('$') || value.includes('-')))
}

/**
 * Returns a CSS color.
 * @param palette Color palette.
 * @param [value] Color value.
 * @returns CSS color or red.
 */
export const getCssColor = (palette: ColorPalette, value?: string): string => {
  if (!value) return ''
  if (isCssColor(value)) return value
  if (isMappedColor(value)) {
    const key = value.replace('$', '')
    const color = palette[key as keyof ColorPalette]
    return getCssColor(palette, color)
  }
  return 'red'
}

/**
 * Creates a color palette.
 * @param scheme Color scheme.
 * @returns Color palette.
 */
export const getColorPalette = (scheme: ColorScheme) => {
  const palette = schemes[scheme]

  return Object.keys(palette).reduce((t, k) => {
    return { ...t, [k]: getCssColor(palette, palette[k as keyof ColorPalette]) }
  }, {} as ColorPalette)
}
