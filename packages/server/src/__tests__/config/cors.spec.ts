import { CORS_OPTIONS, CustomOrigin } from '~/config/cors'
import { MAIN_CLIENT } from '~/config/env'

// #region Setup

const origin = CORS_OPTIONS.origin as CustomOrigin
const callback = jest.fn(
  (error: Error | null, allowed?: boolean) => !error && allowed
)

// #endregion

describe('config/cors', () => {
  it('should allow the request (no origin)', () => {
    origin(undefined, callback)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback.mock.results[0].value).toBeTruthy()
  })

  it('should allow the request (main client)', () => {
    origin(MAIN_CLIENT, callback)
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback.mock.results[1].value).toBeTruthy()
  })

  it('should block the request (unknown origin)', () => {
    origin('https://www.example.com', callback)
    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback.mock.results[2].value).toBeFalsy()
  })
})
