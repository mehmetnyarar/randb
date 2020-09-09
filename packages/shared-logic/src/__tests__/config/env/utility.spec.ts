import { access } from 'fs'
import { join } from 'path'
import { getEnvConfig, isBrowser, isNode } from '~/config/env/utility'

// #region Setup

/**
 * Checks whether a path exists or not.
 * @param path Path.
 * @returns True if exists.
 */
const exists = async (path: string) =>
  new Promise(resolve => {
    access(path, error => {
      if (error) resolve(false)
      resolve(true)
    })
  })

// #endregion

describe('config/env/utility', () => {
  describe('isBrowser/isNode', () => {
    it('should determine the environment', () => {
      expect(isBrowser()).toBeTruthy()
      expect(isNode()).toBeFalsy()
    })
  })

  describe('getEnvConfig', () => {
    it('should create config (default)', () => {
      const result = getEnvConfig()
      expect(result).toEqual({
        CLIENT_PORT: undefined,
        GRAPHQL_API_URL: 'http://localhost:4000/graphql',
        GRAPHQL_SUBSCRIPTIONS_URL: 'ws://localhost:4000/graphql'
      })
    })

    it('should create config (production)', () => {
      const result = getEnvConfig({
        env: { HOST_SSL: true, HOST_DOMAIN: 'myapp.com' },
        phase: 'production'
      })
      expect(result).toEqual({
        CLIENT_PORT: undefined,
        GRAPHQL_API_URL: 'https://myapp.com/graphql',
        GRAPHQL_SUBSCRIPTIONS_URL: 'wss://myapp.com/graphql'
      })
    })
  })

  describe('getEnvConfigAsync', () => {
    it('should check whether the env file exists', async () => {
      const file = join(process.cwd(), 'src/config/env/env.ts')
      expect(await exists(file)).toBeTruthy()
    })

    test.todo('Create a test for getEnvConfigAsync()')
  })
})
