import { config } from 'dotenv'
import { join } from 'path'
import 'reflect-metadata'
import { LogMethod } from '~/logger'

// Load environment variables
const envPath = join(process.cwd(), '.env.test')
config({ path: envPath })

// MongoDB In-Memory Server
// Read environment variables for mongodb-memory-server (MONGOMS_*)
jest.setTimeout(600000) // Additional time to download MongoDB binaries

// Disable console printing for the following methods during the tests
// Use .warn() method if you need to debug
const originalConsole = { ...console }
const consoleMocks: LogMethod[] = ['debug', 'error', 'info', 'log', 'trace']

beforeAll(() => {
  consoleMocks.forEach(method => {
    jest.spyOn(global.console, method).mockImplementation(jest.fn)
  })
})

afterAll(() => {
  jest.restoreAllMocks()
  global.console = originalConsole
})
