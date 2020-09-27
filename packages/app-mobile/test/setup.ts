/// <reference types="../custom" />

import { LogMethod } from '@app/logic'
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
import '@testing-library/jest-native/extend-expect'
import 'dotenv/config'
import 'react-native-gesture-handler/jestSetup'

// Mock react-navigation
jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Reanimated.default.call = () => {}
  return Reanimated
})

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native')
  return {
    ...actual,
    useNavigation: () => ({
      canGoBack: jest.fn(),
      dispatch: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn()
    })
  }
})

// Mock AsyncStorage
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

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
