import { renderScreen } from 'test/render'
import { SettingsScreen } from '~/screens/menu'

describe('screens/menu/settings', () => {
  it('should render', async () => {
    const { findByText } = renderScreen(SettingsScreen)
    expect(await findByText('dark')).toBeTruthy()
  })
})
