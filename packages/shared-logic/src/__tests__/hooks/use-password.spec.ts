import { renderHook } from '@testing-library/react-hooks'
import { usePassword } from '~/hooks/use-password'

describe('hooks/use-password', () => {
  it('should generate a password', () => {
    const { result, waitForNextUpdate } = renderHook(() => usePassword())

    expect(result.current.result).toBe('')

    result.current.generatePassword()

    waitForNextUpdate()

    expect(result.current.result).toHaveLength(12)
  })
})
