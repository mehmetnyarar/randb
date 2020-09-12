import { render } from '@testing-library/react'
import React from 'react'
import Home from '~/pages/index'
import App from '~/pages/_app'

describe('pages/_app', () => {
  it('should render', () => {
    const { queryByRole } = render(
      <App
        Component={Home}
        pageProps={{ initialApolloState: {} }}
        router={null}
      />
    )

    expect(queryByRole('main')).toBeTruthy()
  })
})
