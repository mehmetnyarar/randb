/* eslint-disable @typescript-eslint/no-var-requires */

import { waitFor } from '@testing-library/react'
import React from 'react'
import { currentUser } from 'test/mocks'
import { render } from 'test/render'
import Screen from '~/pages/index'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()
useRouter.mockImplementationOnce(() => ({ push }))

describe('pages/index', () => {
  it('should redirect to the welcome page', async () => {
    const { container } = render(<Screen />, {
      mocks: [currentUser.isNotSignedIn]
    })

    expect(container).toBeEmptyDOMElement()
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/welcome')
    })
  })

  test.todo('should redirect to the dashboard page')
})
