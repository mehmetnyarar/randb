import { modelOptions, Severity } from '@typegoose/typegoose'

/**
 * Creates model options for a database entity.
 * @param collection Name of the collection.
 * @returns Model options.
 */
export const EntityModel = (collection: string, allowMixed?: Severity) =>
  modelOptions({
    schemaOptions: {
      collection
    },
    options: {
      allowMixed
    }
  })
