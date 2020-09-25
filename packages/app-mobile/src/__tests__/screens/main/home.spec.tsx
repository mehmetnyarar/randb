import React from 'react'
import { welcome } from 'test/mocks'
import { render } from 'test/render'
import { waitForResponse } from 'test/utils'
import { HomeScreen } from '~/screens/main'

describe('app', () => {
  it('should render', async () => {
    const { queryByText } = render(<HomeScreen />, {
      mocks: [welcome.success]
    })
    expect(queryByText(/mobile app/i)).toBeTruthy()
    expect(queryByText(/loading/i)).toBeTruthy()

    await waitForResponse()
    expect(queryByText(/loading/i)).toBeFalsy()
    expect(queryByText(/graphql/i)).toBeTruthy()
  })
})
