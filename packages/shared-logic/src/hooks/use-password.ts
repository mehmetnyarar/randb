import { generate } from 'generate-password'
import { useCallback, useState } from 'react'
import { HookResult } from './types'

export interface UsePasswordResult extends HookResult<string> {
  generatePassword: () => void
}

/**
 * Password generator.
 */
export const usePassword = (): UsePasswordResult => {
  const [result, setResult] = useState('')
  const generatePassword = useCallback(() => {
    setResult(
      generate({
        length: 12,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
        excludeSimilarCharacters: true,
        strict: true
      })
    )
  }, [])

  return {
    result,
    generatePassword
  }
}
