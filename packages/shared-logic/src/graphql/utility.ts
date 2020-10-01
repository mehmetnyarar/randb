import { omitDeep } from '../utility'

/**
 * Cleans up a GraphQL object.
 * @param data Data.
 * @param [fields] Fields to remove.
 * @returns Data.
 */
export function cleanup<T> (data: T, fields: string[] = []): T {
  if (!data) return data

  const exclude = fields.concat('__typename')
  return omitDeep(data, exclude)
}
