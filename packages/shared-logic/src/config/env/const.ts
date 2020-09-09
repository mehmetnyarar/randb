import { Env } from './types'

/**
 * Default environment variables.
 */
export const DEFAULT_ENV: Env = {
  HOST_SSL: false,
  HOST_DOMAIN: 'localhost',
  SERVER_PORT: 4000,
  CLIENT_PORT: undefined,
  GQL_API_PATH: '/graphql',
  GQL_SUBSCRIPTIONS_PATH: '/graphql'
}
