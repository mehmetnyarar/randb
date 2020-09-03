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
  SSL,
  PORT,
  HTTP_URL,
  WS_URL,
  CLIENTS,
  MAIN_CLIENT,
  CORS_ALLOWED,
  CORS_BLOCKED
} = create()

if (!isTest()) {
  console.debug('\n')
  console.debug(
    'config/env',
    JSON.stringify(
      {
        SSL,
        PORT,
        HTTP_URL,
        WS_URL,
        CLIENTS,
        MAIN_CLIENT,
        CORS_ALLOWED,
        CORS_BLOCKED
      },
      null,
      2
    )
  )
}
