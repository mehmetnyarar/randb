/**
 * Determines whether the runtime environment is browser or not.
 * @returns True if "window" is defined.
 */
export const isBrowser = () => typeof window !== 'undefined'

/**
 * Determines whether the runtime environment is node or not.
 * @returns True if "window" is undefined.
 */
export const isNode = () => typeof window === 'undefined'
