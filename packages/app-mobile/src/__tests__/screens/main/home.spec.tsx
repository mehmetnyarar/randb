import { waitFor } from '@testing-library/react-native'
import React from 'react'
import { welcome } from 'test/mocks'
import { render } from 'test/render'
import { HomeScreen } from '~/screens/main'

describe('app', () => {
  it('should render', async () => {
    const { getByTestId, queryByTestId } = render(<HomeScreen />, {
      mocks: [welcome.success]
    })
    expect(getByTestId('welcome')).toBeTruthy()

    expect(queryByTestId('api-loading')).toHaveTextContent('...')
    await waitFor(() => {
      expect(queryByTestId('api-welcome')).toBeTruthy()
    })
  })
})
