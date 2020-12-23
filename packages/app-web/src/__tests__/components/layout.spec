import { waitFor } from '@testing-library/react'
// import { axe } from 'jest-axe'
import React from 'react'
import { bscs, currentUser, signoutUser } from 'test/mocks'
import { render } from 'test/render'
import { Layout } from '~/components/layout'

// FIXME Test fails: No more mocked responses for the query: query BSCs($filter: NetworkElementsFilter)

delete window.location
window.location = { ...window.location, reload: jest.fn() }

describe('components/layout', () => {
  it('should render', async () => {
    const {
      // debug,
      // container,
      getByRole,
      // getByTestId,
      getByText
      // queryByTestId,
      // getAllByRole
    } = render(
      <Layout title='Test Page'>
        <main role='main' />
      </Layout>,
      {
        mocks: [
          currentUser.isSignedIn,
          bscs.success,
          signoutUser.success,
          currentUser.isNotSignedIn
        ]
      }
    )

    // Show loading to the user
    expect(getByText(/loading/i)).toBeInTheDocument()

    // User is signed in
    await waitFor(() => {
      expect(getByRole('banner')).toBeInTheDocument()
    })

    // debug()
    // expect(getByRole('main')).toBeInTheDocument()
    // expect(getByRole('contentinfo')).toBeInTheDocument()
    // expect(getAllByRole('navigation')).toHaveLength(1)

    // // const a11y = await axe(container)
    // // expect(a11y).toHaveNoViolations()

    // await waitFor(() => {
    //   expect(queryByTestId('signout')).toBeInTheDocument()
    // })
    // expect(getAllByRole('navigation')).toHaveLength(2)

    // const signout = getByTestId('signout')
    // await waitFor(() => {
    //   expect(signout).not.toBeDisabled()
    // })

    // fireEvent.click(signout)
    // await waitFor(() => {
    //   expect(queryByTestId('signout')).not.toBeInTheDocument()
    //   expect(getAllByRole('navigation')).toHaveLength(1)
    // })

    // const theme = getByTestId('theme')
    // expect(theme).toHaveValue('light')

    // fireEvent.change(theme, { target: { value: 'dark' } })
    // await waitFor(() => {
    //   expect(theme).toHaveValue('dark')
    // })

    // const language = getByTestId('language')
    // expect(language).toHaveValue('en')

    // fireEvent.change(language, { target: { value: 'tr' } })
    // await waitFor(() => {
    //   expect(window.location.reload).toHaveBeenCalled()
    // })
  })
})
