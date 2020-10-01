import { fireEvent, waitFor } from '@testing-library/dom'
import React from 'react'
import { signinUser } from 'test/mocks'
import { render } from 'test/render'
import Screen from '~/pages/signin'

describe('pages/signin', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should change signin method', () => {
    const { getByText, queryByText } = render(<Screen />)

    expect(queryByText('auth.signin.method.USERNAME')).not.toBeInTheDocument()
    expect(queryByText('auth.signin.method.EMAIL')).toBeInTheDocument()
    expect(queryByText('auth.signin.method.PHONE')).toBeInTheDocument()

    const toPhone = getByText('auth.signin.method.PHONE')
    fireEvent.click(toPhone)

    expect(queryByText('auth.signin.method.USERNAME')).toBeInTheDocument()
    expect(queryByText('auth.signin.method.EMAIL')).toBeInTheDocument()
    expect(queryByText('auth.signin.method.PHONE')).not.toBeInTheDocument()
  })

  it('should signin', async () => {
    const { container, getByTestId } = render(<Screen />, {
      mocks: [signinUser.success]
    })

    const username = getByTestId('username')
    expect(username).toBeInTheDocument()
    fireEvent.change(username, { target: 'test-user' })

    const password = getByTestId('password')
    fireEvent.change(password, { target: '123456' })

    const submit = getByTestId('submit')
    fireEvent.click(submit)

    waitFor(() => {
      expect(container).toBeEmptyDOMElement()
    })
  })

  it('should fail to signin', async () => {
    const { getByTestId } = render(<Screen />, {
      mocks: [signinUser.failure]
    })

    const username = getByTestId('username')
    expect(username).toBeInTheDocument()
    fireEvent.change(username, { target: 'no-user' })

    const password = getByTestId('password')
    fireEvent.change(password, { target: '123456' })

    const submit = getByTestId('submit')
    fireEvent.click(submit)

    waitFor(() => {
      expect(submit).toBeInTheDocument()
    })
  })
})
