import { Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { Entity } from '~/models'
import { Maybe } from '~/types'

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
 * Converts ObjectId to StringID.
 * @param id ID.
 * @returns StringID.
 */
export function toStrId<T extends Entity> (id: Ref<T>) {
  return (id as Types.ObjectId).toHexString()
}

/**
 * Converts ObjectId to StringID if possible.
 * @param id ID.
 * @returns StringID or default value.
 */
export function getStrId<T extends Entity> (
  id?: Ref<T>,
  defaultValue: Maybe<string> = undefined
) {
  return id ? toStrId(id) : defaultValue
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

// /**
//  * Filters ObjectIds.
//  * @param ids IDs.
//  * @param remove ID to exclude.
//  */
// export function without<T extends Entity> (ids: Ref<T>[], remove: Ref<T>) {
//   return ids.filter(
//     ref => !(ref as Types.ObjectId).equals(remove as Types.ObjectId)
//   )
// }

// /**
//  * Filters ObjectIds.
//  * @param ids IDs.
//  * @param remove IDs to exclude.
//  */
// export function withoutSome<T extends Entity> (ids: Ref<T>[], remove: Ref<T>[]) {
//   return ids.filter(ref => {
//     return !(remove as Types.ObjectId[]).includes(ref as Types.ObjectId)
//   })
// }
