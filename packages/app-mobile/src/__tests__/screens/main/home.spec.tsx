import { currentUser, welcome } from 'test/mocks'
import { renderScreen } from 'test/render'
import { waitForResponse } from 'test/utils'
import { HomeScreen } from '~/screens/main'

describe('screens/main/home', () => {
  it('should render', async () => {
    const { queryByText } = renderScreen(HomeScreen, {
      mocks: [welcome.success, currentUser.isSignedIn]
    })

    expect(queryByText(/app/i)).toBeTruthy()
    expect(queryByText(/loading/i)).toBeTruthy()

    await waitForResponse()
    expect(queryByText(/loading/i)).toBeFalsy()
    expect(queryByText(/graphql/i)).toBeTruthy()
  })
})
