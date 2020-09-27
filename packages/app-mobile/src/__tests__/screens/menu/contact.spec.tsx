import { renderScreen } from 'test/render'
import { ContactScreen } from '~/screens/menu'

describe('screens/menu/contact', () => {
  it('should render', async () => {
    const { getByText } = renderScreen(ContactScreen)
    expect(getByText(/ContactScreen/)).toBeTruthy()
  })
})
