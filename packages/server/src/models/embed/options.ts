import { modelOptions, Severity } from '@typegoose/typegoose'

/**
 * Creates model options for an embed document.
 * @param [hasId] Has id field?
 * @param [allowMixed] Allow mixed?
 * @returns Model options.
 */
export const EmbedModel = (hasId = false, allowMixed?: Severity) =>
  modelOptions({
    schemaOptions: {
      _id: hasId
    },
    options: {
      allowMixed
    }
  })
