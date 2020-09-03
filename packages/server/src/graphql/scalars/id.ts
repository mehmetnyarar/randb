import { GraphQLScalarType, Kind } from 'graphql'
import { Types } from 'mongoose'
import { ScalarsTypeMap } from 'type-graphql/dist/schema/build-context'

/**
 * ObjectId scalar.
 */
export const ObjectIdScalar: ScalarsTypeMap = {
  type: Types.ObjectId,
  scalar: new GraphQLScalarType({
    name: 'ObjectId',
    serialize (value: Types.ObjectId) {
      return value.toHexString()
    },
    parseValue (value: string) {
      return Types.ObjectId(value)
    },
    parseLiteral (node) {
      return node.kind === Kind.STRING ? Types.ObjectId(node.value) : null
    }
  })
}
