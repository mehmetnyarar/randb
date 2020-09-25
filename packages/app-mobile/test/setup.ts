import { LogMethod } from '@app/logic'
import '@testing-library/jest-native/extend-expect'

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
