import { fireEvent, waitFor } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { currentUser, signinUser } from 'test/mocks'
import { render } from 'test/utils'
import Screen from '~/pages/signin'

describe('pages/signin', () => {
  it('should render', async () => {
    const { findByText, getByLabelText, queryByText } = render(<Screen />, {
      mocks: [currentUser.isNotSignedIn]
    })

    const title = await findByText('screen.signin')
    expect(title).toBeInTheDocument()

    expect(getByLabelText('username')).toBeInTheDocument()
    expect(queryByText('auth.signin.method.USERNAME')).toBeFalsy()
    expect(queryByText('auth.signin.method.EMAIL')).toBeInTheDocument()
    expect(queryByText('auth.signin.method.PHONE')).toBeInTheDocument()
  })

  test.todo('should change the signin method')

  it('should signin the user', async () => {
    const { container, findByLabelText, getByTestId } = render(<Screen />, {
      mocks: [currentUser.isNotSignedIn, signinUser.success]
    })

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()

    const input = await findByLabelText('username')
    fireEvent.change(input, { target: 'test-user' })

    const password = await findByLabelText('password')
    fireEvent.change(password, { target: '123456' })

    const submit = getByTestId('submit')
    fireEvent.click(submit)

    waitFor(() => {
      expect(container).toBeEmptyDOMElement()
    })
  })

  it('should fail to signin the user', async () => {
    const { container, findByLabelText, getByTestId } = render(<Screen />, {
      mocks: [currentUser.isNotSignedIn, signinUser.failure]
    })

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()

    const input = await findByLabelText('username')
    fireEvent.change(input, { target: 'no-user' })

    const password = await findByLabelText('password')
    fireEvent.change(password, { target: '123456' })

    const submit = getByTestId('submit')
    fireEvent.click(submit)

    waitFor(() => {
      expect(container).not.toBeEmptyDOMElement()
    })
  })
})
