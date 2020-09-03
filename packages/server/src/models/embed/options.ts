import { modelOptions } from '@typegoose/typegoose'

/**
 * Creates model options for an embed document.
 * @param [hasId] Has id field?
 * @returns Model options.
 */
export const EmbedModel = (hasId = false) =>
  modelOptions({
    schemaOptions: {
      _id: hasId
    }
  })
