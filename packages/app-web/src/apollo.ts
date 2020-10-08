import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import {
  ApolloClientLocalState,
  isBrowser,
  isSubscription,
  isUpload,
  Logger
} from '@app/logic'
import { createUploadLink } from 'apollo-upload-client'
import { useMemo } from 'react'
import { GRAPHQL_API_URL, GRAPHQL_SUBSCRIPTIONS_URL } from '~/config'

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
  const browser = isBrowser()
  logger.debug('create', { language, browser })

  // Cookie authentication
  const httpLink = createHttpLink({
    uri: GRAPHQL_API_URL, // Server URL (must be absolute),
    credentials: 'include' // Additional fetch() options like `credentials` or `headers`
  })

  let terminatingLink = httpLink
  if (browser) {
    // Subscriptions
    const wsLink = new WebSocketLink({
      uri: GRAPHQL_SUBSCRIPTIONS_URL,
      options: {
        lazy: true,
        reconnect: true,
        connectionParams: () => {
          return {
            language,
            'accept-language': language
          }
        }
      }
    })

    // Uploads
    const uploadLink = createUploadLink({
      uri: GRAPHQL_API_URL
    }) as any

    // Terminating link
    terminatingLink = split(
      isSubscription,
      wsLink,
      split(isUpload, uploadLink, httpLink)
    )
  }

  // Language
  const langLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        'accept-language': language
      }
    }
  })

  // Error
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      const headers = operation.getContext().headers
      logger.debug('errorLink', { graphQLErrors, networkError, headers })

      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          switch (err.extensions.code) {
            case 'UNAUTHENTICATED':
              operation.setContext({
                headers: {
                  ...headers,
                  'accept-language': language
                }
              })
              return forward(operation)
          }
        }
      }
    }
  )

  // Retry
  // https://www.apollographql.com/docs/react/api/link/apollo-link-retry/
  // import { RetryLink } from "@apollo/client/link/retry"
  // const retryLink = new RetryLink()

  const link = from([langLink, errorLink, terminatingLink])
  const cache = new InMemoryCache({
    typePolicies: {
      Site: {
        fields: {
          children: {
            merge: false
          }
        }
      }
    }
  })

  return new ApolloClient({
    link,
    cache,
    ssrMode: !browser,
    connectToDevTools: browser
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
