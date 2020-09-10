import { renderHook } from '@testing-library/react-hooks'
import { useTheme } from '~/theme/context/use'

describe('theme/context/use', () => {
  it('should return context (default)', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.scheme).toBe('light')
  })

  it('should return context (initial)', () => {
    const { result } = renderHook(() => useTheme({ scheme: 'dark' }))
    expect(result.current.scheme).toBe('dark')

    result.current.changeScheme('light')
    expect(result.current.scheme).toBe('light')
  })
})
