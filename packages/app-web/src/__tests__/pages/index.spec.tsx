import React from 'react'
import { data, errors } from 'test/mocks'
import { render } from 'test/render'
import { waitForResponse } from 'test/utils'
import Home, { getStaticProps } from '~/pages/index'

describe('pages/index', () => {
  it('should render', async () => {
    const { getByText, queryByText } = render(<Home />, { mocks: data })

    expect(getByText(/web app/i)).toHaveTextContent('Welcome')
    expect(queryByText(/loading/i)).toBeTruthy()

    await waitForResponse()
    expect(queryByText(/loading/i)).toBeNull()
    expect(queryByText(/graphql/i)).toBeTruthy()
  })

  it('should render error', async () => {
    const { queryByText } = render(<Home />, { mocks: errors })
    expect(queryByText(/loading/i)).toBeTruthy()

    await waitForResponse()
    expect(queryByText(/loading/i)).toBeNull()
    expect(queryByText(/error/i)).toBeTruthy()
  })

  it('should create static props', async () => {
    const result = await getStaticProps()
    expect(result).toEqual({
      props: {
        initialApolloState: {}
      },
      revalidate: 1
    })
  })
})
