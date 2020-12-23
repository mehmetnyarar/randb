import React from 'react'
import { currentUser } from 'test/mocks'
import { render } from 'test/utils'
import Screen from '~/pages/welcome'

describe('pages/welcome', () => {
  it('should render', async () => {
    const { findByText } = render(<Screen />, {
      mocks: [currentUser.isNotSignedIn]
    })

    expect(await findByText('welcome')).toBeInTheDocument()
  })
})
