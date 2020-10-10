import { ApolloClient } from '@apollo/client'
import { isBrowser } from '../config'
import { Logger } from '../logger'
import { createApolloClient } from './create'
import { ApolloClientLocalState, ApolloOptions } from './types'

const logger = Logger.create({
  src: 'apollo'
})

let apolloClient: ApolloClient<ApolloClientLocalState>

/**
 * Initializes ApolloClient.
 * @param [options={}] Options.
 * @returns ApolloClient.
 */
export const initializeApolloClient = (options: ApolloOptions = {}) => {
  logger.debug('initialize', { options })
  const { initialState } = options
  const _apolloClient = apolloClient ?? createApolloClient(options)

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
