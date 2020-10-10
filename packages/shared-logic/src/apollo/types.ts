import { AnalyticsInput, Language } from '../graphql'

/**
 * Local state for Apollo Client.
 */
export interface ApolloClientLocalState {}

/**
 * Authentication tokens.
 */
export interface AuthTokens {
  accessToken?: string
  refreshToken?: string
}

/**
 * Options for Apollo client.
 */
export interface ApolloOptions extends AnalyticsInput {
  apiUrl?: string
  subscriptionsUrl?: string
  auth?: AuthTokens
  language?: Language | string
  initialState?: ApolloClientLocalState
}
