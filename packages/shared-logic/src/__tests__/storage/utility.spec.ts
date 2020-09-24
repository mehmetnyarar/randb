import { storage } from '~/storage'

// #region Setup

jest.spyOn(localStorage, 'getItem')
jest.spyOn(localStorage, 'setItem')
jest.spyOn(localStorage, 'removeItem')

// #endregion

describe('storage', () => {
  it('should set, get and remove the storage item', async () => {
    storage.set('scheme', 'light')
    expect(localStorage.setItem).toHaveBeenCalledWith('scheme', 'light')

    let value = await storage.get('scheme')
    expect(localStorage.getItem).toHaveBeenCalledWith('scheme')
    expect(value).toBe('light')

    await storage.remove('scheme')
    value = await storage.get('scheme')
    expect(localStorage.removeItem).toHaveBeenCalledWith('scheme')
    expect(value).toBeUndefined()
  })

  test.todo('Create a test for storage/set failure')
  test.todo('Create a test for storage/get failure')
  test.todo('Create a test for storage/remove failure')
})
