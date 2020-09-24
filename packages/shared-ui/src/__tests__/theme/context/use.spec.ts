import { storage } from '@app/logic'
import { renderHook } from '@testing-library/react-hooks'
import { ColorScheme } from '~/theme'
import { DEFAULT_SCHEME } from '~/theme/context/const'
import { useTheme } from '~/theme/context/use'

// #region Setup

jest.spyOn(storage, 'get')
jest.spyOn(storage, 'set')
jest.spyOn(storage, 'remove')

beforeEach(() => {
  jest.clearAllMocks()
})

// #endregion

describe('theme/context/use', () => {
  it('should save the default theme to the local storage', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTheme())

    await waitForNextUpdate()
    expect(result.current.scheme).toBe(DEFAULT_SCHEME)
    expect(storage.set).toHaveBeenCalledWith('scheme', DEFAULT_SCHEME)
  })

  it('should save the theme to the local storage', async () => {
    const scheme: ColorScheme = 'dark'
    await storage.set('scheme', scheme)

    const { result, waitForNextUpdate } = renderHook(() => useTheme())

    await waitForNextUpdate()
    expect(result.current.scheme).toBe(scheme)
    expect(storage.set).toHaveBeenCalledWith('scheme', scheme)
  })

  it('should change the theme', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTheme())

    result.current.onSchemeChange('dark')

    await waitForNextUpdate()
    expect(result.current.scheme).toBe('dark')
    expect(storage.set).toHaveBeenCalledWith('scheme', 'dark')
  })
})
