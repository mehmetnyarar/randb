import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import {
  render as rtlRender,
  RenderOptions
} from '@testing-library/react-native'
import React from 'react'

/**
 * Wrapper props.
 */
interface WrapperProps {
  mocks?: MockedResponse[]
  children?: React.ReactElement
}

/**
 * Render options.
 */
interface Options extends WrapperProps, RenderOptions {}

const render = (
  ui: React.ReactElement,
  { mocks = [], ...renderOptions }: Options = {}
) => {
  // Pages or components that require context should be wrapped with providers
  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  )

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions
    })
  }
}

export { render }
