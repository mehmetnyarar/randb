import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloClientLocalState, isBrowser } from '@app/logic'
import { useMemo } from 'react'
import { GRAPHQL_API_URL } from '~/config'

let apolloClient: ApolloClient<ApolloClientLocalState>

/**
 * Creates a new ApolloClient.
 */
function createApolloClient () {
  return new ApolloClient({
    ssrMode: !isBrowser(),
    link: new HttpLink({
      uri: GRAPHQL_API_URL, // Server URL (must be absolute)
      credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache()
  })
}

/**
 * Initializes the ApolloClient.
 * @param initialState Initial state.
 */
export function initializeApollo (initialState: ApolloClientLocalState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  // For SSG and SSR always create a new Apollo Client
  if (!isBrowser()) return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

/**
 * ApolloClient hook.
 * @param initialState Initial state.
 * @returns ApolloClient.
 */
export function useApollo (initialState: ApolloClientLocalState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
