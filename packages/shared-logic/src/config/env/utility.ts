import { isProduction } from '../phase'
import { DEFAULT_ENV } from './const'
import { Env, EnvOptions } from './types'

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

/**
 * Creates environment configuration.
 * @param [options={}] Options.
 * @returns Environment configuration.
 */
export const getEnvConfig = (options: EnvOptions = {}) => {
  const { env = {}, phase, hostIp } = options
  const {
    HOST_SSL,
    HOST_DOMAIN,
    SERVER_PORT,
    CLIENT_PORT,
    GQL_API_PATH,
    GQL_SUBSCRIPTIONS_PATH
  }: Env = {
    ...DEFAULT_ENV,
    ...env
  }

  const production = isProduction(phase)
  const http = production && HOST_SSL ? 'https' : 'http'
  const ws = production && HOST_SSL ? 'wss' : 'ws'

  if (production) {
    return {
      CLIENT_PORT,
      GRAPHQL_API_URL: `${http}://${HOST_DOMAIN}${GQL_API_PATH}`,
      GRAPHQL_SUBSCRIPTIONS_URL: `${ws}://${HOST_DOMAIN}${GQL_SUBSCRIPTIONS_PATH}`
    }
  }

  // Use IP address if it's set
  // To be used during mobile (android) development
  const domain = hostIp || HOST_DOMAIN
  return {
    CLIENT_PORT,
    GRAPHQL_API_URL: `${http}://${domain}:${SERVER_PORT}${GQL_API_PATH}`,
    GRAPHQL_SUBSCRIPTIONS_URL: `${ws}://${domain}:${SERVER_PORT}${GQL_SUBSCRIPTIONS_PATH}`
  }
}

/**
 * Creates environment configuration.
 * @param [options={}] Options.
 * @returns Environment configuration.
 */
export const getEnvConfigAsync = async (options: EnvOptions = {}) => {
  let env = DEFAULT_ENV

  try {
    env = (await import('./env')).ENV
  } catch (error) {
    console.error('Failed to load environment variables!', { error })
  }

  return getEnvConfig({ ...options, env })
}
