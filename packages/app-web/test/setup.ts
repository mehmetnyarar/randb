// import { ApolloClient, InMemoryCache } from '@apollo/client'
import { LogMethod } from '@app/logic' // ApolloClientLocalState
import '@testing-library/jest-dom/extend-expect'
import { config } from 'dotenv'
import i18n from 'i18next'
import 'jest-axe/extend-expect'
import 'jest-localstorage-mock'
import { initReactI18next } from 'react-i18next'
import Modal from 'react-modal'
import { t } from './mocks'

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
// jest.mock('~/apollo', () => {
//   const client = new ApolloClient<ApolloClientLocalState>({
//     cache: new InMemoryCache()
//   })

//   return {
//     initializeApollo: () => client,
//     useApollo: () => client
//   }
// })

// Mock react-modal
jest
  .spyOn(Modal, 'setAppElement')
  .mockImplementation(param => console.log(`setAppElement:'${param}'`))

// Mock i18n
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: {
      common: {}
    }
  }
})
jest.mock('~/i18n', () => {
  return {
    useTranslation: () => {
      return {
        t,
        i18n: {
          language: 'en',
          changeLanguage: jest
            .fn()
            .mockImplementation((lang: string) => console.log(lang))
        }
      }
    },
    withTranslation: () => (Component: any) => {
      Component.defaultProps = { ...Component.defaultProps, t }
      return Component
    }
  }
})

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
