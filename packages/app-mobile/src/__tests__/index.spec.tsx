import { render } from '@testing-library/react-native'
import React from 'react'
import App from '~/index'

describe('app', () => {
  it('should render', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('welcome')).toBeTruthy()
  })
})
