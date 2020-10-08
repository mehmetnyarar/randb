import { registerEnumType } from 'type-graphql'

/**
 * Event type.
 */
export enum EventType {
  // System events
  // @see ~/logger
  SYS_FATAL = 'SYS_FATAL',
  SYS_ERROR = 'SYS_ERROR',
  SYS_SUCCESS = 'SYS_SUCCESS',
  SYS_INFO = 'SYS_INFO',
  SYS_WARN = 'SYS_WARN',
  SYS_TODO = 'SYS_TODO',
  SYS_DEBUG = 'SYS_DEBUG',
  SYS_TRACE = 'SYS_TRACE',

  // Entity events
  ENTITY_SEARCH = 'ENTITY_SEARCH',
  ENTITY_CREATE = 'ENTITY_CREATE',
  ENTITY_UPDATE = 'ENTITY_UPDATE',
  ENTITY_DELETE = 'ENTITY_DELETE',

  // Auth events
  AUTH_SIGNIN = 'AUTH_SIGNIN',
  AUTH_WRONG_PASSWORD = 'AUTH_WRONG_PASSWORD',
  AUTH_SIGNOUT = 'AUTH_SIGNOUT',

  // Network events
  IMPORT_START = 'IMPORT_START',
  IMPORT_ADD = 'IMPORT_ADD',
  IMPORT_ERROR = 'IMPORT_ERROR',
  IMPORT_END = 'IMPORT_END'
}

registerEnumType(EventType, { name: 'EventType' })
