import chalk from 'chalk'
import { format } from 'date-fns'
import { appendFile } from 'fs-extra'
import { join } from 'path'
import sanitize from 'sanitize-filename'
import { isProduction, LOGS_DIR, Phase } from '~/config'
import { levels, styles } from './const'
import {
  CreateLoggerOptions,
  LoggerOptions,
  LogLevel,
  LogMeta,
  LogMethod,
  LogStorage
} from './types'

/**
 * Logger.
 */
export class Logger {
  // #region Properties

  /**
   * Origin.
   */
  readonly src: string

  /**
   * Max log level to print logs to the console.
   */
  readonly level: LogLevel

  /**
   * Storages.
   */
  readonly storages: LogStorage[]

  // #endregion

  // #region Constructor

  /**
   * Initializes a new instance of Logger.
   * @param [options={}] Logger options.
   * @param [phase] Application phase.
   */
  constructor (options: LoggerOptions = {}, phase?: Phase) {
    this.src = options.src || 'common'
    this.level = options.level || (isProduction(phase) ? 'warn' : 'debug')
    this.storages = options.storages || []
  }

  // #endregion

  // #region Helpers

  /**
   * Determines the method for console printing.
   * @param level Log level.
   * @returns Leveled console method.
   */
  getMethod (level: LogLevel): LogMethod | undefined {
    switch (level) {
      case 'off':
        return undefined
      case 'fatal':
        return 'error'
      case 'success':
        return 'info'
      case 'todo':
        return 'warn'
      default:
        return level
    }
  }

  /**
   * Outputs a message to the console.
   * @param level Log level.
   * @param message Message.
   * @param [meta] Additional information.
   */
  console (level: LogLevel, message: string, meta?: LogMeta) {
    if (this.level === 'off') return
    if (levels[level] > levels[this.level]) return

    const method = this.getMethod(level)
    if (!method) return

    const time = new Date().toISOString()
    const info = chalk`{grey ${time}} {bold [${this.src}]}`

    console[method](chalk`${info} {${styles[level]} ${message}}`)
    if (meta) console[method](JSON.stringify(meta, null, 2))
  }

  /**
   * Stores log.
   * @param level Log level.
   * @param message Message.
   * @param [meta] Additional information.
   */
  store (level: LogLevel, message: string, meta?: LogMeta) {
    if (this.level === 'off') return

    for (const storage of this.storages) {
      if (levels[level] <= levels[storage.level]) {
        storage.fn({
          date: new Date().toISOString(),
          src: this.src,
          level,
          message,
          meta: JSON.stringify(meta)
        })
      }
    }
  }

  // #endregion

  // #region Console API

  assert = console.assert
  clear = console.clear
  count = console.count
  countReset = console.countReset

  /**
   * Logs a debug message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  debug (message: string, meta?: LogMeta) {
    this.console('debug', message, meta)
    this.store('debug', message, meta)
  }

  dir = console.dir
  dirxml = console.dirxml

  /**
   * Logs an error message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  error (message: string, meta?: LogMeta) {
    this.console('error', message, meta)
    this.store('error', message, meta)
  }

  group = console.group
  groupCollapsed = console.groupCollapsed
  groupEnd = console.groupEnd

  /**
   * Logs an info message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  info (message: string, meta?: LogMeta) {
    this.console('info', message, meta)
    this.store('info', message, meta)
  }

  log = console.log
  table = console.table
  time = console.time
  timeEnd = console.timeEnd
  timeLog = console.timeLog

  /**
   * Logs a trace message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  trace (message: string, meta?: LogMeta) {
    this.console('trace', message, meta)
    this.store('trace', message, meta)
  }

  /**
   * Logs a warning message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  warn (message: string, meta?: LogMeta) {
    this.console('warn', message, meta)
    this.store('warn', message, meta)
  }

  profile = console.profile
  profileEnd = console.profileEnd
  timeStamp = console.timeStamp

  // #endregion

  // #region Additional Methods

  /**
   * Logs a fatal error.
   * @param message Message.
   * @param [meta] Additional information.
   */
  fatal (message: string, meta?: LogMeta) {
    this.console('fatal', message, meta)
    this.store('fatal', message, meta)
  }

  /**
   * Logs a success message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  success (message: string, meta?: LogMeta) {
    this.console('success', message, meta)
    this.store('success', message, meta)
  }

  /**
   * Logs a todo message.
   * @param message Message.
   * @param [meta] Additional information.
   */
  todo (message: string, meta?: LogMeta) {
    this.console('todo', message, meta)
    this.store('todo', message, meta)
  }

  /**
   * Prints a new line to the console.
   */
  newline () {
    if (this.level !== 'off') {
      console.log('\n')
    }
  }

  // #endregion

  // #region Create

  /**
   * Creates a new Logger with default storages.
   * @param [options={}] Options.
   * @returns Logger.
   */
  static create (options: CreateLoggerOptions = {}) {
    const { db, file, remote, ...base } = options
    const logger = new Logger(base)

    // Add db storage
    if (db) {
      logger.storages.push({
        type: 'db',
        level: db,
        fn: () => {
          throw new Error('Database storage is not implemented!')
        }
      })
    }

    // Add file storage
    if (file) {
      logger.storages.push({
        type: 'file',
        level: file,
        fn: entry => {
          const name = sanitize(logger.src, { replacement: '-' })
          const date = format(new Date(), 'yyyyMMdd')
          const path = join(LOGS_DIR, `${name}_${date}.log`)
          const record = Object.keys(entry)
            .map(key => entry[key])
            .join(',')

          appendFile(path, `${record}\n`, { encoding: 'utf-8' }, error => {
            // This is only for debugging
            // istanbul ignore next
            if (error) {
              console.debug('An error occured while storing the log!', {
                path,
                entry,
                error
              })
            }
          })
        }
      })
    }

    // Add remote storage
    if (remote) {
      logger.storages.push({
        type: 'remote',
        level: remote,
        fn: () => {
          throw new Error('Remote storage is not implemented!')
        }
      })
    }

    return logger
  }

  // #endregion
}
