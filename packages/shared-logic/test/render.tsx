import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import React from 'react'
import { AuthOptions, AuthProvider, SnackProvider } from '~/modules'

/**
 * Wrapper props.
 */
interface WrapperProps extends AuthOptions {
  mocks?: MockedResponse[]
  children?: React.ReactElement
}

/**
 * Render options.
 */
interface Options extends WrapperProps, RenderOptions {}

const render = (
  ui: React.ReactElement,
  { origin, mocks = [], ...renderOptions }: Options = {}
) => {
  // Pages or components that require context should be wrapped with providers
  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <SnackProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthProvider origin={origin}>{children}</AuthProvider>
      </MockedProvider>
    </SnackProvider>
  )

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions
    })
  }
}

export { render }
