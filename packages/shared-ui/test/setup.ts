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
