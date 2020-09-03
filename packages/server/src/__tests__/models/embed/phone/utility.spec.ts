import { getPhoneNumber } from '~/models/embed/phone'

describe('models/embed/person/utility', () => {
  it('should return stringified person name', () => {
    const result = getPhoneNumber({ cc: '1', dc: '100', sn: '1001010' })
    expect(result).toBe('+11001001010')
  })
})
