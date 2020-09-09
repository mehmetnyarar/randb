import { Phase } from '../phase'

/**
 * Environment variables.
 */
export interface Env {
  /**
   * Indicates whether the host has SSL installed or not.
   * The value must match with server/env/HOST_SSL.
   * Default: false.
   */
  HOST_SSL?: boolean

  /**
   * Host's domain name.
   * The value must match with server/env/HOST_DOMAIN.
   * Default: localhost.
   */
  HOST_DOMAIN?: string

  /**
   * Port number of the backend server.
   * The value must match with the server/env/SERVER_PORT.
   * Default: 4000.
   */
  SERVER_PORT?: number

  /**
   * Port number of the web client.
   * The value must be added to server/env/CLIENT_PORTS.
   * Can be omitted for mobile apps or web apps that doesn't provide SSR.
   * Default: undefined.
   */
  CLIENT_PORT?: number

  /**
   * GraphQL path.
   * The value must match with server/env/GQL_API_PATH.
   * Default: /graphql
   */
  GQL_API_PATH?: string

  /**
   * Subscriptions path.
   * The value must match with server/env/GQL_SUBSCRIPTIONS_PATH.
   * Default: /graphql
   */
  GQL_SUBSCRIPTIONS_PATH?: string
}

/**
 * Environment configuration.
 */
export interface EnvConfig {
  /**
   * Port number of the web client.
   * Can be omitted for mobile apps or web apps that doesn't provide SSR.
   * Default: undefined.
   */
  CLIENT_PORT?: number

  /**
   * Endpoint URL for the GraphQL queries and mutations.
   */
  GRAPHQL_API_URL: string

  /**
   * Endpoint URL for the GraphQL subscriptions.
   */
  GRAPHQL_SUBSCRIPTIONS_URL: string
}

/**
 * Options to get environment configuration.
 */
export interface EnvOptions {
  /**
   * Environment variables.
   */
  env?: Env

  /**
   * Use production mode?
   */
  phase?: Phase

  /**
   * Use IP address instead of domain?
   */
  hostIp?: string
}
