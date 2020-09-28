import { httpContext as context } from 'test/mocks'
import { CommonResolver } from '~/resolvers/common'

// #region Setup

const resolver = new CommonResolver()

// #endregion

describe('resolver/common', () => {
  it('should return a string', () => {
    const result = resolver.welcome(context)
    expect(result).toBeTruthy()
    expect(context.t).toHaveBeenCalled()
  })
})
