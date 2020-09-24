// REVIEW @pp/logic/config/env may not be required
// See whether mobile app also does not need that too

/**
 * Application name.
 * @see env/NEXT_PUBLIC_APP_NAME
 */
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'My App'

/**
 * Copyright info.
 * @see env/NEXT_PUBLIC_APP_COPY
 */
export const APP_COPY = process.env.NEXT_PUBLIC_APP_COPY || '2020'

/**
 * Application version.
 * @see env/NEXT_PUBLIC_APP_VERSION
 */
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'

/**
 * GraphQL endpoint for queries and mutations.
 * @see env/NEXT_PUBLIC_GQL_API_URL
 */
export const GRAPHQL_API_URL =
  process.env.NEXT_PUBLIC_GQL_API_URL || 'http://localhost:4000/graphql'

/**
 * GraphQL endpoint for subscriptions
 * @see env/NEXT_PUBLIC_GQL_SUBSCRIPTIONS_URL
 */
export const GRAPHQL_SUBSCRIPTIONS_URL =
  process.env.NEXT_PUBLIC_GQL_SUBSCRIPTIONS_URL || 'ws://localhost:4000/graphql'

console.info('config', {
  APP_NAME,
  APP_COPY,
  APP_VERSION,
  GRAPHQL_API_URL,
  GRAPHQL_SUBSCRIPTIONS_URL
})
