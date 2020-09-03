import { getClassForDocument } from '@typegoose/typegoose'
import { Document, Model } from 'mongoose'
import { MiddlewareFn } from 'type-graphql'

/**
 * Converts Mongoose document to object.
 * @param doc Mongoose document.
 * @returns Object.
 */
export const convertDocument = (doc: Document) => {
  const convertedDocument = doc.toObject()
  const DocumentClass = getClassForDocument(doc) as NewableFunction
  Object.setPrototypeOf(convertedDocument, DocumentClass.prototype)

  return convertedDocument
}

/**
 * Typegoose middleware Apollo Server.
 * @param _ Action.
 * @param next Function.
 * @returns Object or objects.
 */
export const middleware: MiddlewareFn<unknown> = async (_, next) => {
  const result = await next()

  if (Array.isArray(result)) {
    return result.map(item =>
      item instanceof Model ? convertDocument(item) : item
    )
  }

  if (result instanceof Model) {
    return convertDocument(result)
  }

  return result
}
