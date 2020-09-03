/**
 * Environment variables.
 */
export interface Env {
  HOST_SSL?: string
  HOST_DOMAIN?: string
  SERVER_PORT?: string
  CLIENT_PORTS?: string
  CORS_WHITELIST?: string
  CORS_BLACKLIST?: string
  DB_URI?: string
  DB_INIT?: string
}

/**
 * Required environment variables.
 */
export type RequiredEnv = Partial<Record<keyof Env, boolean>>

/**
 * Environment configuration.
 */
export interface EnvConfig {
  /**
   * Indicates whether SSL is installed on the host machine or not.
   */
  SSL: boolean

  /**
   * Server's port number.
   */
  PORT: number

  /**
   * Server's HTTP URL.
   */
  HTTP_URL: string

  /**
   * Server's Web-socket URL.
   */
  WS_URL: string

  /**
   * Web clients.
   */
  CLIENTS: string[]

  /**
   * Main web client.
   */
  MAIN_CLIENT: string

  /**
   * Addresses that should be allowed by CORS.
   */
  CORS_ALLOWED: string[]

  /**
   * Addresses that should be blocked by CORS.
   */
  CORS_BLOCKED: string[]

  /**
   * MongoDB connection string.
   */
  DB_URI: string

  /**
   * Tasks to be executed during the database initialization.
   */
  DB_INIT: string
}
