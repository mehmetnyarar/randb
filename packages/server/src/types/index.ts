import { DocumentType } from '@typegoose/typegoose'
import { Entity } from '~/models'

/**
 * Entity or document.
 */
export type EntityOrDocument<T extends Entity> = T | DocumentType<T>

/**
 * Maybe.
 */
export type Maybe<T> = T | undefined

/**
 * Nullable.
 */
export type Nullable<T> = T | null | undefined

/**
 * Value or Promise.
 */
export type Promisable<T> = T | Promise<T>
