// REVIEW @pp/logic/config/env may not be required
// See whether mobile app also does not need that too

/**
 *Server URL.
 * @see env/NEXT_PUBLIC_SERVER_URL
 */
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000'

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
  SERVER_URL,
  GRAPHQL_API_URL,
  GRAPHQL_SUBSCRIPTIONS_URL
})
