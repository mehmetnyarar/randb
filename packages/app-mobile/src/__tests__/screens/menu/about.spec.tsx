import { renderScreen } from 'test/render'
import { AboutScreen } from '~/screens/menu'

describe('screens/menu/about', () => {
  it('should render', async () => {
    const { getByText } = renderScreen(AboutScreen)
    expect(getByText(/AboutScreen/)).toBeTruthy()
  })
})
