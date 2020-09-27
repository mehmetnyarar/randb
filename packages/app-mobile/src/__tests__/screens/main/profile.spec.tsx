import { currentUser, signoutUser, welcome } from 'test/mocks'
import { renderScreen } from 'test/render'
import { ProfileScreen } from '~/screens/main'

describe('screens/main/profile', () => {
  it('should render', async () => {
    const { queryByText, findByText } = renderScreen(ProfileScreen, {
      auth: false,
      mocks: [welcome.success, currentUser.isSignedIn, signoutUser.success]
    })

    expect(queryByText(/ProfileScreen/)).toBeTruthy()
    expect(await findByText(/signout/i)).toBeTruthy()

    test.todo('Create a test for signout')
  })
})
