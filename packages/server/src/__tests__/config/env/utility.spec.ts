import { REQUIRED_ENV } from '~/config/env/const'
import { Env, EnvConfig } from '~/config/env/types'
import { create, validate } from '~/config/env/utility'

// #region Setup

const base: EnvConfig = {
  DEBUG: false,
  SSL: false,
  PORT: 4000,
  DOMAIN: '',
  HTTP_URL: '',
  WS_URL: '',
  CLIENTS: [],
  MAIN_CLIENT: '',
  CORS_BLOCKED: [],
  CORS_ALLOWED: [],
  DB_URI: '',
  DB_INIT: '',
  GRAPHQL_AUTH: true,
  GRAPHQL_PATH: undefined,
  GRAPHQL_CONFIG: {
    tracing: false,
    playground: false,
    introspection: false,
    uploads: {
      maxFiles: 10,
      maxFileSize: 100000000
    },
    subscriptions: undefined,
    engine: undefined
  },
  APOLLO_KEY: undefined,
  RESET_TOKEN: '',
  ACCESS_TOKEN: '',
  REFRESH_TOKEN: '',
  SA_PASSWORD: ''
}

// #endregion

describe('config/env/utility', () => {
  describe('validate', () => {
    it('should throw an error (no env variables)', () => {
      expect(() => {
        validate()
      }).toThrow()
    })

    it('should validate successfully (no required keys)', () => {
      expect(validate({})).toBeTruthy()
    })

    it('should report the missing variables', () => {
      expect(() => {
        validate({}, REQUIRED_ENV)
      }).toThrow()
    })

    it('should report the unset variables', () => {
      expect(() => {
        validate(
          {
            HOST_DOMAIN: '',
            DB_URI: '',
            AUTH_RESET_TOKEN: '',
            AUTH_ACCESS_TOKEN: '',
            AUTH_REFRESH_TOKEN: '',
            SA_PASSWORD: ''
          },
          REQUIRED_ENV
        )
      }).toThrow()
    })

    it('should validate successfully', () => {
      expect(
        validate(
          {
            HOST_DOMAIN: 'domain',
            DB_URI: 'uri',
            AUTH_RESET_TOKEN: 'token,config',
            AUTH_ACCESS_TOKEN: 'token,config',
            AUTH_REFRESH_TOKEN: 'token,config',
            SA_PASSWORD: 'password'
          },
          REQUIRED_ENV
        )
      ).toBeTruthy()
    })
  })

  describe('create', () => {
    it('should create a configuration (process.env)', () => {
      const result = create()
      expect(Object.keys(result)).toHaveLength(20)
    })

    it('should create a configuration (default env)', () => {
      const config: EnvConfig = {
        ...base,
        HTTP_URL: 'http://:4000',
        WS_URL: 'ws://:4000',
        CLIENTS: ['http://:5000'],
        MAIN_CLIENT: 'http://:5000',
        CORS_BLOCKED: [],
        CORS_ALLOWED: ['http://:4000', 'ws://:4000', 'http://:5000']
      }
      expect(create({})).toEqual(config)
    })

    it('should create a configuration (custom env)', () => {
      const env: Env = {
        HOST_DOMAIN: 'localhost',
        CLIENT_PORTS: ''
      }
      const config: EnvConfig = {
        ...base,
        DOMAIN: 'localhost',
        HTTP_URL: 'http://localhost:4000',
        WS_URL: 'ws://localhost:4000',
        CLIENTS: [],
        MAIN_CLIENT: '',
        CORS_BLOCKED: [],
        CORS_ALLOWED: ['http://localhost:4000', 'ws://localhost:4000']
      }
      expect(create(env)).toEqual(config)
    })

    it('should create a configuration (production)', () => {
      const env: Env = {
        HOST_SSL: 'true',
        HOST_DOMAIN: 'myapp.com'
      }
      const config: EnvConfig = {
        ...base,
        SSL: true,
        DOMAIN: 'myapp.com',
        HTTP_URL: 'https://myapp.com',
        WS_URL: 'wss://myapp.com',
        CLIENTS: ['https://myapp.com'],
        MAIN_CLIENT: 'https://myapp.com',
        CORS_BLOCKED: [],
        CORS_ALLOWED: ['https://myapp.com', 'wss://myapp.com']
      }
      expect(create(env, 'production')).toEqual(config)
    })
  })
})
