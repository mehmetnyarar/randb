import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import {
  AuthProvider,
  NetworkProvider,
  RequestOrigin,
  SearchProvider,
  SnackProvider
} from '@app/logic'
import { ThemeProvider } from '@app/ui'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import React from 'react'
import { SnackBar } from '~/components/snackbar'

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
      <SnackProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <AuthProvider origin={RequestOrigin.WEB}>
            <SearchProvider>
              <NetworkProvider>{children}</NetworkProvider>
            </SearchProvider>
          </AuthProvider>
        </MockedProvider>
        <SnackBar />
      </SnackProvider>
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
