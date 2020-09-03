import { CommonResolver } from '~/resolvers/common'

// #region Setup

const resolver = new CommonResolver()

// #endregion

describe('resolver/common', () => {
  it('should return a string', () => {
    expect(resolver.welcome()).toBeTruthy()
  })
})
