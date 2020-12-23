import React from 'react'
import { bscs, currentUser } from 'test/mocks'
import { render, screen } from 'test/utils'
import Screen from '~/pages/dashboard'

describe('pages/dashboard', () => {
  it('should render', async () => {
    render(<Screen />, { mocks: [currentUser.isSignedIn, bscs.success] })
    expect(await screen.findByText('screen.dashboard')).toBeInTheDocument()
  })
})
