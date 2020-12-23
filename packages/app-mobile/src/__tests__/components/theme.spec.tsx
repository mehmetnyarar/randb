import { waitFor } from '@testing-library/react-native'
import React from 'react'
import { render } from 'test/render'
import { ThemeSelection } from '~/components/theme'

describe('components/theme', () => {
  it('should render', async () => {
    const { queryByText } = render(<ThemeSelection />)

    await waitFor(() => {
      expect(queryByText('light')).toBeFalsy()
      expect(queryByText('dark')).toBeTruthy()
    })

    test.todo('Simulate theme change')
  })
})
