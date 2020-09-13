import { RequiredEnv } from './types'

/**
 * Required environment variables.
 */
export const REQUIRED_ENV: RequiredEnv = {
  HOST_DOMAIN: true,
  DB_URI: true,
  AUTH_RESET_TOKEN: true,
  AUTH_ACCESS_TOKEN: true,
  AUTH_REFRESH_TOKEN: true,
  SA_PASSWORD: true
}
