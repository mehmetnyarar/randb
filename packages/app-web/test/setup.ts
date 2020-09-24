import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloClientLocalState, LogMethod } from '@app/logic'
import '@testing-library/jest-dom/extend-expect'
import { config } from 'dotenv'
import 'jest-axe/extend-expect'
import 'jest-localstorage-mock'
import Modal from 'react-modal'

// Load the environment variables
config()

// Mock next/router
jest.mock('next/router', () => ({
  useRouter () {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn()
    }
  }
}))

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

// Mock react-modal
jest
  .spyOn(Modal, 'setAppElement')
  .mockImplementation(param => console.log(`setAppElement:'${param}'`))

// Disable console printing for the following methods during the tests
// Use log or warn methods if you need to debug
const originalConsole = { ...console }
const consoleMocks: LogMethod[] = ['debug', 'error', 'info', 'trace']

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
