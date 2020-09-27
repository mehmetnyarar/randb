import { useTheme } from '@app/ui/lib/theme/context/use'
import { renderHook } from '@testing-library/react-hooks'
import { getColor } from '~/components/snackbar/utility'

describe('components/snackbar/utility', () => {
  it('should return correct colors', () => {
    const { result } = renderHook(() => useTheme())
    const { palette } = result.current

    expect(getColor(palette, 'error')).toBe(palette['color-danger-500'])
    expect(getColor(palette, 'success')).toBe(palette['color-success-500'])
    expect(getColor(palette, 'warning')).toBe(palette['color-warning-500'])
    expect(getColor(palette, 'info')).toBe(palette['color-info-500'])
    expect(getColor(palette)).toBe(palette['color-info-500'])
  })
})
