import { Types } from 'mongoose'
import { ObjectIdScalar } from '~/graphql/scalars/id'

// #region Setup

const { scalar } = ObjectIdScalar

const _id = Types.ObjectId()
const id = _id.toHexString()

// #endregion

describe('graphql/scalars/id', () => {
  it('should serialize', () => {
    expect(scalar.serialize(_id)).toBe(id)
  })

  it('should parse value', () => {
    expect(scalar.parseValue(id)).toEqual(_id)
  })

  it('should parse literal', () => {
    expect(
      scalar.parseLiteral({ kind: 'StringValue', value: id }, undefined)
    ).toEqual(_id)
    expect(
      scalar.parseLiteral({ kind: 'NullValue', value: undefined }, undefined)
    ).toBeNull()
  })
})
