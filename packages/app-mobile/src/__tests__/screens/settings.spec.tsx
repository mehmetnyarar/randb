import React from 'react'
import { render } from 'test/render'
import { SettingsScreen } from '~/screens/settings'

describe('app', () => {
  it('should render', async () => {
    const { getByText } = render(<SettingsScreen />)
    expect(getByText('light')).toBeTruthy()
  })
})
