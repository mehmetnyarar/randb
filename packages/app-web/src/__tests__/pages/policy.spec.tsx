import React from 'react'
import { currentUser } from 'test/mocks'
import { render, screen } from 'test/utils'
import Screen from '~/pages/policy'

describe('pages/policy', () => {
  it('should render', async () => {
    render(<Screen />, { mocks: [currentUser.isNotSignedIn] })
    expect(await screen.findAllByText('screen.policy')).toHaveLength(2)
    expect(await screen.findByText('policy')).toBeInTheDocument()
  })
})
