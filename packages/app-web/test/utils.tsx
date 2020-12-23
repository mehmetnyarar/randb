/* eslint-disable import/export */

import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import {
  AuthProvider,
  NetworkProvider,
  RequestOrigin,
  SearchProvider,
  SnackProvider
} from '@app/logic'
import { ThemeProvider } from '@app/ui'
import { render, RenderOptions } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { SnackBar } from '~/components/snackbar'

/**
 * Waits for a GraphQL operation to be resolved.
 * @see https://www.apollographql.com/docs/react/development-testing/testing/
 */
export const waitForResponse = async () =>
  new Promise(resolve => setTimeout(resolve, 0))

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

const customRender = (
  ui: React.ReactElement,
  { mocks = [], ...renderOptions }: Options = {}
) => {
  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <RecoilRoot>
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
    </RecoilRoot>
  )

  return {
    ...render(ui, {
      wrapper: Wrapper,
      ...renderOptions
    })
  }
}

export * from '@testing-library/react'
export { customRender as render }
