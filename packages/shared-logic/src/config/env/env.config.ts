import { Env } from './types'

/**
 * Environment variables.
 * @todo Create .env file using this sample.
 */
export const ENV: Env = {
  HOST_SSL: false,
  HOST_DOMAIN: 'localhost',
  SERVER_PORT: 4000,
  CLIENT_PORT: undefined,
  GQL_API_PATH: '/graphql',
  GQL_SUBSCRIPTIONS_PATH: '/graphql'
}
