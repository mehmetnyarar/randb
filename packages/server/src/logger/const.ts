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
 */
export const styles: Record<LogLevel, string> = {
  off: 'hidden',
  fatal: 'red',
  error: 'red',
  success: 'green',
  info: 'blue',
  warn: 'yellow',
  todo: 'magenta',
  debug: 'visible',
  trace: 'visible'
}
