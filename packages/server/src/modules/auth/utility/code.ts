import { customAlphabet } from 'nanoid'

/**
 * Creates an authentication code.
 */
export const createAuthCode = customAlphabet('1234567890', 6)
