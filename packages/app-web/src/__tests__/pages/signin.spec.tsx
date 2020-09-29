import { fireEvent, waitFor } from '@testing-library/dom'
import React from 'react'
import { signinUser } from 'test/mocks'
import { render } from 'test/render'
import Screen from '~/pages/signin'

describe('pages/signin', () => {
  it('should change signin method', () => {
    const { getByTestId } = render(<Screen />)

    const changeMethod = getByTestId('ghost-button')
    expect(changeMethod).toHaveTextContent(/phone/i)

    fireEvent.click(changeMethod)
    expect(changeMethod).toHaveTextContent(/email/i)

    fireEvent.click(changeMethod)
    expect(changeMethod).toHaveTextContent(/phone/i)
  })

  it('should signin', async () => {
    const { container, getByTestId } = render(<Screen />, {
      mocks: [signinUser.success]
    })

    const email = getByTestId('email')
    expect(email).toBeInTheDocument()
    fireEvent.change(email, { target: 'test.user@myapp.com' })

    const password = getByTestId('password')
    fireEvent.change(password, { target: '123456' })

    const submit = getByTestId('submit-button')
    fireEvent.click(submit)

    waitFor(() => {
      expect(container).toBeEmptyDOMElement()
    })
  })

  it('should fail to signin', async () => {
    const { getByTestId } = render(<Screen />, {
      mocks: [signinUser.failure]
    })

    const email = getByTestId('email')
    expect(email).toBeInTheDocument()
    fireEvent.change(email, { target: 'no.user@myapp.com' })

    const password = getByTestId('password')
    fireEvent.change(password, { target: '123456' })

    const submit = getByTestId('submit-button')
    fireEvent.click(submit)

    waitFor(() => {
      expect(submit).toBeInTheDocument()
    })
  })
})
