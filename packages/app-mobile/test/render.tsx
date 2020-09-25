import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { ThemeProvider } from '@app/ui'
import * as eva from '@eva-design/eva'
import {
  render as rtlRender,
  RenderOptions
} from '@testing-library/react-native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React from 'react'

/**
 * Wrapper props.
 */
interface WrapperProps {
  mocks?: MockedResponse[]
  children?: React.ReactElement
}

const WithTheme: React.FC<WrapperProps> = ({ mocks, children }) => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <IconRegistry icons={EvaIconsPack} />
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  </ApplicationProvider>
)

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
      <WithTheme mocks={mocks}>{children}</WithTheme>
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
