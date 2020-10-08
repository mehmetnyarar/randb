import { Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { Entity } from '~/models'

/**
 * Converts StringId to ObjectId.
 * @param id ID.
 * @returns ObjectId.
 */
export function toId (id: string) {
  return Types.ObjectId(id)
}

/**
 * Converts StringId to ObjectId if possible.
 * @param [id] ID.
 * @param [defaultValue] Default value to return.
 * @returns ObjectId or default value.
 */
export function getId (id?: string, defaultValue?: Types.ObjectId) {
  return id ? toId(id) : defaultValue
}

/**
 * Converts refs to ObjectIds.
 * @param refs Refs.
 * @returns ObjectIds.
 */
export function refsToObjIds<T extends Entity> (refs: Ref<T>[]) {
  return refs as Types.ObjectId[]
}

/**
 * Checks whether an entity exists in the given refs.
 * @param id ID.
 * @param refs Refs.
 * @returns True if the condition is met.
 */
export function exists<T extends Entity> (id: Types.ObjectId, refs: Ref<T>[]) {
  return (refs as Types.ObjectId[]).find(ref => ref.equals(id))
}
