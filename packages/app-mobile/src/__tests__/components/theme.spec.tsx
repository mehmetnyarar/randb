import React from 'react'
import { render } from 'test/render'
import { ThemeSelection } from '~/components/theme'

describe('components/layout', () => {
  it('should render', () => {
    const { queryByText } = render(<ThemeSelection />)

    expect(queryByText('light')).toBeTruthy()
    expect(queryByText('dark')).toBeFalsy()

    test.todo('Simulate theme change')
  })
})
