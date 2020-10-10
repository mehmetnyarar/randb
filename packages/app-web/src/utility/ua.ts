import { UAParser } from 'ua-parser-js'

/**
 * Returns the user-agent information.
 * @param [agent] User-agent.
 * @returns User-agent info.
 */
export const getUserAgent = (agent?: string) => {
  const ua =
    agent || (typeof window !== 'undefined' ? window.navigator.userAgent : '')
  return ua ? JSON.stringify(new UAParser(ua).getResult()) : ''
}
