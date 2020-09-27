import { SnackType } from '@app/logic'
import { ColorPalette } from '@app/ui'

/**
 * Determines the main color for the snack.
 * @param palette Color palette.
 * @param type Snack type.
 * @returns CSS color.
 */
export const getColor = (palette: ColorPalette, type: SnackType = 'info') => {
  switch (type) {
    case 'error':
      return palette['color-danger-500']
    case 'success':
      return palette['color-success-500']
    case 'warning':
      return palette['color-warning-500']
    default:
      return palette['color-info-500']
  }
}
