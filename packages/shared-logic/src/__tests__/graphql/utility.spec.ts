import { cleanup } from '~/graphql'

describe('graphql/utility', () => {
  it('should return the data as is (nil)', () => {
    expect(cleanup(undefined)).toBeUndefined()
    expect(cleanup(null)).toBeNull()
  })

  it('should cleanup the object (default)', () => {
    const obj = {
      __typename: 'GraphQLType',
      test: 'value'
    }

    const result = cleanup(obj)
    expect(result).toEqual({ test: 'value' })
  })

  it('should cleanup the object', () => {
    const obj = {
      __typename: 'GraphQLType',
      test: 'value',
      extra: 'extra value'
    }

    const result = cleanup(obj, ['extra'])
    expect(result).toEqual({ test: 'value' })
  })
})
