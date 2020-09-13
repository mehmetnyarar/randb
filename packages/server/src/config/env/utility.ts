import { compact, uniq } from 'lodash'
import { isDevelopment, isProduction, Phase } from '../phase'
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
    DB_INIT = '',
    GQL_AUTH = 'true',
    GQL_API_PATH,
    GQL_SUBSCRIPTIONS_PATH,
    GQL_TRACING,
    GQL_PLAYGROUND,
    GQL_INTROSPECTION,
    GQL_UPLOADS_MAX_FILES = '10',
    GQL_UPLOADS_MAX_FILE_SIZE = '100000000',
    APOLLO_KEY,
    AUTH_RESET_TOKEN = '',
    AUTH_ACCESS_TOKEN = '',
    AUTH_REFRESH_TOKEN = ''
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
    DB_INIT,
    GRAPHQL_AUTH:
      GQL_AUTH === 'true'
        ? true
        : GQL_AUTH === 'false'
          ? false
          : GQL_AUTH.split(','),
    GRAPHQL_PATH: GQL_API_PATH,
    GRAPHQL_CONFIG: {
      tracing: GQL_TRACING ? GQL_TRACING === 'true' : undefined,
      playground: GQL_PLAYGROUND ? GQL_PLAYGROUND === 'true' : undefined,
      introspection: GQL_INTROSPECTION
        ? GQL_INTROSPECTION === 'true'
        : undefined,
      uploads: {
        maxFiles: Number(GQL_UPLOADS_MAX_FILES),
        maxFileSize: Number(GQL_UPLOADS_MAX_FILE_SIZE)
      },
      subscriptions: GQL_SUBSCRIPTIONS_PATH
        ? { path: GQL_SUBSCRIPTIONS_PATH }
        : undefined,
      engine: APOLLO_KEY ? { reportSchema: isDevelopment() } : undefined
    },
    APOLLO_KEY,
    RESET_TOKEN: AUTH_RESET_TOKEN,
    ACCESS_TOKEN: AUTH_ACCESS_TOKEN,
    REFRESH_TOKEN: AUTH_REFRESH_TOKEN
  }
}
