import React from 'react'
import { currentUser } from 'test/mocks'
import { render, screen } from 'test/utils'
import Screen from '~/pages/contact'

describe('pages/contact', () => {
  it('should render', async () => {
    render(<Screen />, { mocks: [currentUser.isNotSignedIn] })
    expect(await screen.findAllByText('screen.contact')).toHaveLength(2)
    expect(await screen.findByText('phone')).toBeInTheDocument()
    expect(await screen.findByText('email')).toBeInTheDocument()
  })
})
