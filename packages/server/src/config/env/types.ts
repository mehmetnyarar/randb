import { Config as ApolloConfig } from 'apollo-server-express'

/**
 * Environment variables.
 */
export interface Env {
  DEBUG?: string
  HOST_SSL?: string
  HOST_DOMAIN?: string
  SERVER_PORT?: string
  CLIENT_PORTS?: string
  CORS_WHITELIST?: string
  CORS_BLACKLIST?: string
  DB_URI?: string
  DB_INIT?: string
  GQL_AUTH?: string
  GQL_API_PATH?: string
  GQL_SUBSCRIPTIONS_PATH?: string
  GQL_TRACING?: string
  GQL_PLAYGROUND?: string
  GQL_INTROSPECTION?: string
  GQL_UPLOADS_MAX_FILES?: string
  GQL_UPLOADS_MAX_FILE_SIZE?: string
  APOLLO_KEY?: string
  AUTH_RESET_TOKEN?: string
  AUTH_ACCESS_TOKEN?: string
  AUTH_REFRESH_TOKEN?: string
  SA_PASSWORD?: string
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
   * Global debug level.
   */
  DEBUG?: boolean

  /**
   * Indicates whether SSL is installed on the host machine or not.
   */
  SSL: boolean

  /**
   * Server's port number.
   */
  PORT: number

  /**
   * Domain address.
   */
  DOMAIN: string

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

  /**
   * GraphQL auth checker configuration.
   */
  GRAPHQL_AUTH?: boolean | string[]

  /**
   * GraphQL path.
   */
  GRAPHQL_PATH?: string

  /**
   * Apollo server configuration.
   */
  GRAPHQL_CONFIG: ApolloConfig

  /**
   * API key for Apollo Studio.
   */
  APOLLO_KEY?: string

  /**
   * Reset token configuration.
   */
  RESET_TOKEN: string

  /**
   * Access token configuration.
   */
  ACCESS_TOKEN: string

  /**
   * Refresh token configuration.
   */
  REFRESH_TOKEN: string

  /**
   * Password for system admin.
   */
  SA_PASSWORD: string
}
