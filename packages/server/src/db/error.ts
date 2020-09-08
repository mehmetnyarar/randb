import { EntityType } from '~/models'

/**
 * Error message.
 */
export type DatabaseErrorMessage =
  | 'ENTITY_CREATE_ERROR'
  | 'ENTITY_DUPLICATE'
  | 'ENTITY_UPDATE_ERROR'
  | 'ENTITY_NOT_FOUND'
  | 'ENTITY_DELETE_ERROR'

/**
 * Error stack.
 */
export interface DatabaseErrorStack {
  /**
   * Operation.
   */
  operation: 'CREATE' | 'UPDATE' | 'DELETE'

  /**
   * Entity type.
   */
  entity: EntityType

  /**
   * Entity ID.
   */
  id?: string

  /**
   * Data.
   */
  data?: unknown
}

/**
 * Error meta.
 */
export interface DatabaseErrorMeta extends DatabaseErrorStack {
  /**
   * Original error.
   */
  error?: Error
}

export class DatabaseError extends Error {
  constructor (message: DatabaseErrorMessage, meta: DatabaseErrorMeta) {
    super(message)

    const { error, ...stack } = meta

    Object.defineProperty(this, 'name', { value: 'DatabaseError' })
    Object.defineProperty(this, 'stack', { value: JSON.stringify(stack) })
    Object.defineProperty(this, 'originalError', { value: error })
  }
}
