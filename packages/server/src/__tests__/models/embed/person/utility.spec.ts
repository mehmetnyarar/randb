import { getPersonName } from '~/models/embed/person'

describe('models/embed/person/utility', () => {
  it('should return stringified person name', () => {
    const result = getPersonName({ first: 'Test', last: 'User' })
    expect(result).toBe('Test User')
  })
})
