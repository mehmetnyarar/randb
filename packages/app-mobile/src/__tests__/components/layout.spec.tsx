import { renderScreen } from 'test/render'
import { SigninScreen } from '~/screens/auth'
import { HomeScreen } from '~/screens/main'
import { AboutScreen } from '~/screens/menu'

describe('components/layout', () => {
  it('should render an auth screen', async () => {
    const { queryByA11yLabel } = renderScreen(SigninScreen)
    expect(queryByA11yLabel(/top nav/i)).toBeFalsy()
    expect(queryByA11yLabel(/go back/i)).toBeFalsy()
    expect(queryByA11yLabel(/toggle/i)).toBeFalsy()
  })

  it('should render a main screen', async () => {
    const { queryByA11yLabel } = renderScreen(HomeScreen)
    expect(queryByA11yLabel(/top nav/i)).toBeTruthy()
    expect(queryByA11yLabel(/go back/i)).toBeFalsy()
    expect(queryByA11yLabel(/toggle/i)).toBeTruthy()
  })

  it('should render a support screen', async () => {
    const { debug, queryByA11yLabel } = renderScreen(AboutScreen)
    debug()
    expect(queryByA11yLabel(/top nav/i)).toBeTruthy()
    expect(queryByA11yLabel(/go back/i)).toBeTruthy()
    expect(queryByA11yLabel(/toggle/i)).toBeTruthy()
  })
})
