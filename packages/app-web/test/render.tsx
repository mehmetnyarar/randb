import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { ThemeProvider } from '@app/ui'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
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
    <ThemeProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    </ThemeProvider>
  )

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions
    })
  }
}

export { render }
