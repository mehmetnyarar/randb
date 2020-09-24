import React from 'react'
import { currentUser, welcome } from 'test/mocks'
import { render } from 'test/render'
import { waitForResponse } from 'test/utils'
import HomeScreen from '~/pages/index'

describe('pages/index', () => {
  it('should render', async () => {
    const { getByRole, queryByText } = render(<HomeScreen />, {
      mocks: [welcome.success, currentUser.isNotSignedIn]
    })

    expect(getByRole('main')).toBeInTheDocument()
    expect(queryByText(/web app/i)).toBeInTheDocument()

    await waitForResponse()
    expect(queryByText(/graphql/i)).toBeInTheDocument()
  })

  it('should render (welcome error)', async () => {
    const { getByRole, queryByText, queryByTestId } = render(<HomeScreen />, {
      mocks: [welcome.failure, currentUser.isNotSignedIn]
    })

    expect(getByRole('main')).toBeInTheDocument()
    expect(queryByText(/web app/i)).toBeInTheDocument()

    await waitForResponse()
    expect(queryByText(/graphql/i)).not.toBeInTheDocument()
    expect(queryByTestId('welcome-error')).toBeInTheDocument()
  })
})
