/**
 * Storage key.
 */
export type StorageKey =
  | 'scheme'
  | 'signin-method'
  | 'access-token'
  | 'refresh-token'

/**
 * Parse function.
 */
export type StorageParser<T> = (value: string) => T
