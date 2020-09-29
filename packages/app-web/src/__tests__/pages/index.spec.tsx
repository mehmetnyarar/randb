import React from 'react'
import { currentUser, welcome } from 'test/mocks'
import { render } from 'test/render'
import { waitForResponse } from 'test/utils'
import Screen from '~/pages/index'

describe('pages/index', () => {
  it('should render', async () => {
    const { getByRole, queryByText } = render(<Screen />, {
      mocks: [welcome.success, currentUser.isNotSignedIn]
    })

    expect(getByRole('main')).toBeInTheDocument()
    expect(queryByText(/welcome/i)).toBeInTheDocument()

    await waitForResponse()
    expect(queryByText(/graphql/i)).toBeInTheDocument()
  })

  it('should render (welcome error)', async () => {
    const { queryByText, queryByTestId } = render(<Screen />, {
      mocks: [welcome.failure, currentUser.isNotSignedIn]
    })

    await waitForResponse()
    expect(queryByText(/graphql/i)).not.toBeInTheDocument()
    expect(queryByTestId('welcome-error')).toBeInTheDocument()
  })
})
