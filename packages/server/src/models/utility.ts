import { omit, pick } from 'lodash'
import { Types } from 'mongoose'
import { CurrentUser } from '~/modules'
import { AnalyticsInput } from './embed'
import { Entity, EntityInput, Log } from './entity'

/**
 * Creates a document from input data.
 * @param input Input.
 * @param [exlude] Keys to exlude from input.
 * @param [data] Partial updates.
 * @returns Entity.
 */
export function getDoc<T extends Entity, I extends EntityInput> (
  input: I,
  exclude: Array<keyof I> = [],
  partial: Partial<T> = {}
) {
  return {
    ...omit(input, ['id', 'agent', 'origin', ...exclude]),
    ...partial
  } as Partial<T>
}

/**
 * Creates a log from input data.
 * @param input Input.
 * @param [log] Log.
 * @param [user] Current user.
 * @param [exlude] Keys to exlude from input.
 * @returns Log.
 */
export function getLog<I extends AnalyticsInput> (
  input: I,
  log: Partial<Log> = {},
  user?: CurrentUser,
  exclude?: Array<keyof I>
) {
  return {
    ...log,
    ...pick(input, ['agent', 'origin']),
    data: JSON.stringify(exclude ? omit(input, exclude) : input),
    createdBy: user && Types.ObjectId(user.id)
  } as Partial<Log>
}
