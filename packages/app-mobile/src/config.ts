import Constants from 'expo-constants'

/**
 * GraphQL endpoint for queries and mutations.
 * @see env/GQL_API_URL
 * @see app.config/GRAPHQL_API_URL
 */
export const GRAPHQL_API_URL: string = Constants.manifest.extra.GRAPHQL_API_URL

/**
 * GraphQL endpoint for subscriptions.
 * @see env/GQL_SUBSCRIPTIONS_URL
 * @see app.config/GRAPHQL_SUBSCRIPTIONS_URL
 */
export const GRAPHQL_SUBSCRIPTIONS_URL: string =
  Constants.manifest.extra.GRAPHQL_SUBSCRIPTIONS_URL

console.info('config', {
  GRAPHQL_API_URL,
  GRAPHQL_SUBSCRIPTIONS_URL
})
