import { Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { Entity } from '~/models'

/**
 * Checks whether an entity exists in the given refs.
 * @param id ID.
 * @param refs Refs.
 * @returns True if the condition is met.
 */
export function exists<T extends Entity> (id: Types.ObjectId, refs: Ref<T>[]) {
  return (refs as Types.ObjectId[]).find(ref => ref.equals(id))
}
