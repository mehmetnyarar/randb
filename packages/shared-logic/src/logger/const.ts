import { LogLevel } from './types'

/**
 * Log levels, represented by numbers.
 */
export const levels: Record<LogLevel, number> = {
  off: 0,
  fatal: 1,
  error: 2,
  success: 3,
  info: 4,
  warn: 5,
  todo: 6,
  debug: 7,
  trace: 8
}

/**
 * Styles for console printing.
 * Each style corresponds to a log level.
 */
export const styles: Record<'node' | 'browser', Record<LogLevel, string>> = {
  node: {
    off: 'hidden',
    fatal: 'red',
    error: 'red',
    success: 'green',
    info: 'blue',
    warn: 'yellow',
    todo: '',
    debug: 'visible',
    trace: 'visible'
  },
  browser: {
    off: '',
    fatal: 'color: red;',
    error: 'color: red;',
    success: 'color: green;',
    info: 'color: navy;',
    warn: 'color: orange;',
    todo: 'color: magenta;',
    debug: '',
    trace: ''
  }
}
