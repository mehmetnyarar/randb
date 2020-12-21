import { isBrowser, isNode } from '~/config'

describe('config/env/utility', () => {
  describe('isBrowser/isNode', () => {
    it('should determine the environment', () => {
      expect(isBrowser()).toBeTruthy()
      expect(isNode()).toBeFalsy()
    })
  })
})
