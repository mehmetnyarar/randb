import React from 'react'
import { currentUser } from 'test/mocks'
import { render, screen } from 'test/utils'
import Screen from '~/pages/about'

describe('pages/about', () => {
  it('should render', async () => {
    render(<Screen />, { mocks: [currentUser.isNotSignedIn] })
    expect(await screen.findAllByText('screen.about')).toHaveLength(2)
    expect(await screen.findAllByText('app.name')).toHaveLength(3)
    expect(await screen.findAllByText('app.version')).toHaveLength(2)
  })
})
