import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloClientLocalState, isBrowser, Logger } from '@app/logic'
import { useMemo } from 'react'
import { GRAPHQL_API_URL } from '~/config'

const logger = Logger.create({
  src: 'apollo'
})

let apolloClient: ApolloClient<ApolloClientLocalState>

/**
 * Creates a new ApolloClient.
 * @param [language] Language.
 * @returns ApolloClient.
 */
function createApolloClient (language: string) {
  logger.debug('create', { language })

  // Cookie authentication
  const httpLink = createHttpLink({
    uri: GRAPHQL_API_URL, // Server URL (must be absolute),
    credentials: 'include' // Additional fetch() options like `credentials` or `headers`
  })

  // Language
  const langLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        'accept-language': language
      }
    }
  })

  const link = langLink.concat(httpLink)

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    ssrMode: !isBrowser()
  })
}

/**
 * Initializes the ApolloClient.
 * @param [language] Language.
 * @param [initialState] Initial state.
 * @returns ApolloClient.
 */
export function initializeApollo (
  language?: string,
  initialState?: ApolloClientLocalState
) {
  logger.debug('initialize', { language, initialState })
  const _apolloClient = apolloClient ?? createApolloClient(language)

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
 * @param [language] Language.
 * @param [initialState] Initial state.
 * @returns ApolloClient.
 */
export function useApollo (
  language?: string,
  initialState?: ApolloClientLocalState
) {
  logger.debug('use', { language, initialState })
  const client = useMemo(() => initializeApollo(language, initialState), [
    language,
    initialState
  ])

  return client
}
