import { DocumentType } from '@typegoose/typegoose'
import { Entity } from '~/models'

/**
 * Entity or document.
 */
export type EntityOrDocument<T extends Entity> = T | DocumentType<T>

/**
 * Nullable.
 */
export type Nullable<T> = T | null | undefined
