import { compact, uniq } from 'lodash'
import { isProduction, Phase } from '../phase'
import { Env, EnvConfig, RequiredEnv } from './types'

/**
 * Validates environment variables.
 * @param [env] Environment variables.
 * @param [required={}] Required variables.
 * @returns True if the validation succeeds.
 */
export const validate = (env?: Env, required: RequiredEnv = {}) => {
  // Ensure that the env file is loaded and parsed correctly
  if (!env) throw new Error('Error while loading .env!')

  // Get the names of the required environment variables
  const keys = Object.keys(required).reduce((arr, key) => {
    return required[key as keyof Env] ? arr.concat(key) : arr
  }, [] as string[])

  if (keys && keys.length) {
    // Ensure that the required environment variables exist
    const missing = keys.filter(key => !Object.keys(env).includes(key))
    if (missing.length) {
      throw new Error(`Env variables are required: "${missing.join()}"`)
    }

    // Ensure that the required environment variables are set
    const unset = keys.filter(key => !env[key as keyof Env])
    if (unset.length) {
      throw new Error(`Env variables are not set: "${unset.join()}"`)
    }
  }

  return true
}

/**
 * Creates an environment configuration.
 * @param [env] Environment variables.
 * @param [phase] Application phase.
 * @returns Environment configuration.
 */
export const create = (env?: Env, phase?: Phase): EnvConfig => {
  // Phase
  const prod = isProduction(phase)

  // Defaults
  const {
    HOST_SSL = 'false',
    HOST_DOMAIN = '',
    SERVER_PORT = '4000',
    CLIENT_PORTS = '5000',
    CORS_WHITELIST = '',
    CORS_BLACKLIST = '',
    DB_URI = '',
    DB_INIT = ''
  } = env || process.env

  // SSL configuration
  const SSL = HOST_SSL === 'true'

  // Protocols
  const http = SSL ? 'https' : 'http'
  const ws = SSL ? 'wss' : 'ws'

  // Server configuration
  const PORT = Number(SERVER_PORT)
  const HTTP_URL = prod
    ? `${http}://${HOST_DOMAIN}`
    : `${http}://${HOST_DOMAIN}:${SERVER_PORT}`
  const WS_URL = prod
    ? `${ws}://${HOST_DOMAIN}`
    : `${ws}://${HOST_DOMAIN}:${SERVER_PORT}`

  // Web clients
  const CLIENTS = CLIENT_PORTS
    ? compact(
      uniq(
        CLIENT_PORTS.split(',').map(port =>
          prod
            ? `${http}://${HOST_DOMAIN}`
            : `${http}://${HOST_DOMAIN}:${port}`
        )
      )
    )
    : []

  return {
    SSL,
    PORT,
    HTTP_URL,
    WS_URL,
    CLIENTS,
    MAIN_CLIENT: CLIENTS.length ? CLIENTS[0] : '',
    CORS_BLOCKED: compact(CORS_BLACKLIST.split(',')),
    CORS_ALLOWED: compact(CORS_WHITELIST.split(',')).concat(
      uniq([HTTP_URL, WS_URL, ...CLIENTS])
    ),
    DB_URI,
    DB_INIT
  }
}
