import { Logger, LogStorage } from '~/logger'

// #region Setup

beforeEach(() => {
  jest.clearAllMocks()
})

// #endregion

describe('logger', () => {
  describe('constructor', () => {
    it('should create a logger (default)', () => {
      const logger = new Logger()
      expect(logger.src).toBe('common')
      expect(logger.level).toBe('debug')
      expect(logger.storages).toHaveLength(0)
    })

    it('should create a logger (production)', () => {
      const logger = new Logger(undefined, 'production')
      expect(logger.src).toBe('common')
      expect(logger.level).toBe('warn')
      expect(logger.storages).toHaveLength(0)
    })

    it('should create a logger (src)', () => {
      const logger = new Logger({ src: 'test' })
      expect(logger.src).toBe('test')
      expect(logger.level).toBe('debug')
      expect(logger.storages).toHaveLength(0)
    })

    it('should create a logger (level)', () => {
      const logger = new Logger({ level: 'info' })
      expect(logger.src).toBe('common')
      expect(logger.level).toBe('info')
      expect(logger.storages).toHaveLength(0)
    })

    it('should create a logger (storages)', () => {
      const storage: LogStorage = {
        type: 'local',
        level: 'info',
        fn: jest.fn()
      }
      const logger = new Logger({ storages: [storage] })
      expect(logger.src).toBe('common')
      expect(logger.level).toBe('debug')
      expect(logger.storages).toHaveLength(1)
      expect(logger.storages[0]).toEqual(storage)
    })
  })

  describe('getMethod', () => {
    it('should return undefined', () => {
      const logger = Logger.create()
      const value = logger.getMethod('off')
      expect(value).toBeUndefined()
    })

    it('should return error method', () => {
      const logger = Logger.create()
      const value = logger.getMethod('fatal')
      expect(value).toBe('error')
    })

    it('should return info method', () => {
      const logger = Logger.create()
      const value = logger.getMethod('success')
      expect(value).toBe('info')
    })

    it('should return a leveled method', () => {
      const logger = Logger.create()
      const value = logger.getMethod('warn')
      expect(value).toBe('warn')
    })
  })

  describe('console', () => {
    it('should skip (silent)', () => {
      const logger = Logger.create({ level: 'off' })

      logger.console('info', 'test-message')
      expect(console.info).not.toHaveBeenCalled()
    })

    it('should skip (>level)', () => {
      const logger = Logger.create({ level: 'error' })

      logger.console('info', 'test-message')
      expect(console.info).not.toHaveBeenCalled()
    })

    it('should skip (off)', () => {
      const logger = Logger.create({ level: 'error' })

      logger.console('off', 'test-message')
      expect(console.info).not.toHaveBeenCalled()
    })

    it('should print', () => {
      const logger = Logger.create({ level: 'info' })

      logger.console('info', 'test-message')
      expect(console.info).toHaveBeenCalled()
    })

    it('should print meta', () => {
      const logger = Logger.create({ level: 'info' })

      logger.console('info', 'test-message', { meta: 'value' })
      expect(console.info).toHaveBeenCalledTimes(2)
    })

    test.todo('Create a test for node environment')
  })

  describe('store', () => {
    it('should skip (silent)', () => {
      const logger = Logger.create({ level: 'off', local: 'info' })
      const storage = logger.storages[0]
      const spy = jest.spyOn(storage, 'fn')

      logger.store('info', 'test-message')
      expect(storage.fn).not.toHaveBeenCalled()

      spy.mockRestore()
    })

    describe('local', () => {
      it('should skip (>level)', () => {
        const logger = Logger.create({ local: 'error' })
        const storage = logger.storages[0]
        const spy = jest.spyOn(storage, 'fn')

        logger.store('info', 'test-message')
        expect(storage.fn).not.toHaveBeenCalled()

        spy.mockRestore()
      })

      it('should throw an error (not implemented)', () => {
        const logger = Logger.create({ local: 'info' })
        const storage = logger.storages[0]
        const spy = jest.spyOn(storage, 'fn')

        expect(() => {
          logger.store('info', 'test-message')
        }).toThrow()

        spy.mockRestore()
      })
    })

    describe('remote', () => {
      it('should skip (>level)', () => {
        const logger = Logger.create({ remote: 'error' })
        const storage = logger.storages[0]
        const spy = jest.spyOn(storage, 'fn')

        logger.store('info', 'test-message')
        expect(storage.fn).not.toHaveBeenCalled()

        spy.mockRestore()
      })

      it('should throw an error (not implemented)', () => {
        const logger = Logger.create({ remote: 'info' })
        const storage = logger.storages[0]
        const spy = jest.spyOn(storage, 'fn')

        expect(() => {
          logger.store('info', 'test-message')
        }).toThrow()

        spy.mockRestore()
      })
    })
  })

  describe('console methods', () => {
    it('should call console (debug)', () => {
      const logger = Logger.create()
      const spy = jest.spyOn(logger, 'console')

      logger.debug('test-message')
      expect(logger.console).toHaveBeenCalled()

      spy.mockRestore()
    })

    it('should call console and store (error)', () => {
      const logger = Logger.create()
      const spy1 = jest.spyOn(logger, 'console')
      const spy2 = jest.spyOn(logger, 'store')

      logger.error('test-message')
      expect(logger.console).toHaveBeenCalled()
      expect(logger.store).toHaveBeenCalled()

      spy1.mockRestore()
      spy2.mockRestore()
    })

    it('should call console and store (info)', () => {
      const logger = Logger.create()
      const spy1 = jest.spyOn(logger, 'console')
      const spy2 = jest.spyOn(logger, 'store')

      logger.info('test-message')
      expect(logger.console).toHaveBeenCalled()
      expect(logger.store).toHaveBeenCalled()

      spy1.mockRestore()
      spy2.mockRestore()
    })

    it('should call console (trace)', () => {
      const logger = Logger.create()
      const spy = jest.spyOn(logger, 'console')

      logger.trace('test-message')
      expect(logger.console).toHaveBeenCalled()

      spy.mockRestore()
    })

    it('should call console (warn)', () => {
      const logger = Logger.create()
      const spy = jest.spyOn(logger, 'console')

      logger.warn('test-message')
      expect(logger.console).toHaveBeenCalled()

      spy.mockRestore()
    })
  })

  describe('custom methods', () => {
    it('should call console and store (fatal)', () => {
      const logger = Logger.create()
      const spy1 = jest.spyOn(logger, 'console')
      const spy2 = jest.spyOn(logger, 'store')

      logger.fatal('test-message')
      expect(logger.console).toHaveBeenCalled()
      expect(logger.store).toHaveBeenCalled()

      spy1.mockRestore()
      spy2.mockRestore()
    })

    it('should call console and store (success)', () => {
      const logger = Logger.create()
      const spy1 = jest.spyOn(logger, 'console')
      const spy2 = jest.spyOn(logger, 'store')

      logger.success('test-message')
      expect(logger.console).toHaveBeenCalled()
      expect(logger.store).toHaveBeenCalled()

      spy1.mockRestore()
      spy2.mockRestore()
    })

    it('should call console and store (todo)', () => {
      const logger = Logger.create()
      const spy1 = jest.spyOn(logger, 'console')
      const spy2 = jest.spyOn(logger, 'store')

      logger.todo('test-message')
      expect(logger.console).toHaveBeenCalled()
      expect(logger.store).toHaveBeenCalled()

      spy1.mockRestore()
      spy2.mockRestore()
    })

    it('should print a new line', () => {
      const logger = Logger.create()

      logger.newline()
      expect(console.log).toHaveBeenCalled()
    })

    it('should not print a new line', () => {
      const logger = Logger.create({ level: 'off' })

      logger.newline()
      expect(console.log).not.toHaveBeenCalled()
    })
  })

  describe('create', () => {
    it('should create a logger with db storage', () => {
      const logger = Logger.create({ local: 'info' })
      expect(logger.storages).toHaveLength(1)
    })

    it('should create a logger with remote storage', () => {
      const logger = Logger.create({ remote: 'info' })
      expect(logger.storages).toHaveLength(1)
    })
  })
})
