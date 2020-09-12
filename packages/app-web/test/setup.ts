import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloClientLocalState } from '@app/logic'
import '@testing-library/jest-dom/extend-expect'
import { config } from 'dotenv'
import 'jest-axe/extend-expect'

// Load the environment variables
config()

// Mock Apollo Client
jest.mock('~/apollo', () => {
  const client = new ApolloClient<ApolloClientLocalState>({
    cache: new InMemoryCache()
  })

  return {
    initializeApollo: () => client,
    useApollo: () => client
  }
})

// Disable console printing for the following methods during the tests
// Use .warn() method if you need to debug
const originalConsole = { ...console }
const consoleMocks: any[] = ['debug', 'error', 'info', 'log', 'trace']

beforeAll(() => {
  consoleMocks.forEach(method => {
    jest.spyOn(global.console, method).mockImplementation(jest.fn)
  })
})

afterAll(() => {
  jest.restoreAllMocks()
  global.console = originalConsole
})

// Next.js forces tsconfig/isolatedModules=true
// Uncomment the following line in case of an error
// export {}
