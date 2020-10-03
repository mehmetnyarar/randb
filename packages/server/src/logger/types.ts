/**
 * Log level.
 */
export type LogLevel =
  | 'off' // 0
  | 'fatal' // 1
  | 'error' // 2
  | 'success' // 3
  | 'info' // 4
  | 'warn' // 5
  | 'todo' // 6
  | 'debug' // 7
  | 'trace' // 8

/**
 * Log method.
 */
export type LogMethod = 'debug' | 'error' | 'info' | 'log' | 'trace' | 'warn'

/**
 * Entry for log storage.
 */
export interface LogEntry {
  /**
   * Origin.
   */
  src: string

  /**
   * Date.
   */
  date: string

  /**
   * Log level.
   */
  level: LogLevel

  /**
   * Message.
   */
  message: string

  /**
   * Additional information.
   */
  meta?: string

  // Indexer
  [key: string]: string | undefined
}

/**
 * Type of storage.
 */
export type LogStorageType = 'db' | 'file' | 'remote' | 'memory'

/**
 * Storage function.
 */
export type LogStorageFn = (entry: LogEntry) => void | Promise<void>

/**
 * Log storage.
 */
export interface LogStorage {
  /**
   * Type of storage.
   */
  type: LogStorageType

  /**
   * Max log level to perform operation.
   * Levels that are higher than this level are suppressed.
   */
  level: LogLevel

  /**
   * Storage implementation.
   */
  fn: LogStorageFn
}

/**
 * Options to create a new Logger.
 */
export interface LoggerOptions {
  /**
   * Origin.
   * (Default: "common").
   */
  src?: string

  /**
   * Max log level to print logs to the console.
   * Levels that are higher than this level are suppressed.
   * (Default: "debug" in development, "warn" in production).
   */
  level?: LogLevel

  /**
   * Storages.
   * (Default: []).
   */
  storages?: LogStorage[]
}

/**
 * Options to create a new Logger.
 */
export interface CreateLoggerOptions extends LoggerOptions {
  /**
   * Max log level for db storage.
   */
  db?: LogLevel

  /**
   * Max log level for file storage.
   */
  file?: LogLevel

  /**
   * Max log level for remote storage.
   */
  remote?: LogLevel

  /**
   * Max log level for memory storage.
   */
  memory?: LogLevel
}

/**
 * Log meta.
 */
export type LogMeta = Record<string, unknown> | Error
