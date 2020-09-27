import { renderScreen } from 'test/render'
import { SettingsScreen } from '~/screens/menu'

describe('screens/menu/settings', () => {
  it('should render', async () => {
    const { getByText } = renderScreen(SettingsScreen)
    expect(getByText('light')).toBeTruthy()
  })
})
