import { modelOptions } from '@typegoose/typegoose'

/**
 * Creates model options for a database entity.
 * @param collection Name of the collection.
 * @returns Model options.
 */
export const EntityModel = (collection: string) =>
  modelOptions({
    schemaOptions: {
      collection
    }
  })
