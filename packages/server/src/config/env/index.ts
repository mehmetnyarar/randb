import { config } from 'dotenv'
import { isTest } from '../phase'
import { REQUIRED_ENV } from './const'
import { create, validate } from './utility'

// Parse environment variables
const { parsed } = config()

// Validate environment variables
validate(parsed, REQUIRED_ENV)

/**
 * Environment configuration.
 */
export const {
  DEBUG,
  SSL,
  PORT,
  DOMAIN,
  HTTP_URL,
  WS_URL,
  CLIENTS,
  MAIN_CLIENT,
  CORS_ALLOWED,
  CORS_BLOCKED,
  DB_URI,
  DB_INIT,
  GRAPHQL_AUTH,
  GRAPHQL_PATH,
  GRAPHQL_CONFIG,
  APOLLO_KEY,
  RESET_TOKEN,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  SA_PASSWORD
} = create()

if (!isTest()) {
  console.debug('\n')
  console.debug(
    'config/env',
    JSON.stringify(
      {
        DEBUG,
        SSL,
        PORT,
        DOMAIN,
        HTTP_URL,
        WS_URL,
        CLIENTS,
        MAIN_CLIENT,
        CORS_ALLOWED,
        CORS_BLOCKED,
        DB_URI,
        DB_INIT,
        GRAPHQL_AUTH,
        GRAPHQL_PATH,
        GRAPHQL_CONFIG,
        APOLLO_KEY,
        RESET_TOKEN,
        ACCESS_TOKEN,
        REFRESH_TOKEN,
        SA_PASSWORD
      },
      null,
      2
    )
  )
}
