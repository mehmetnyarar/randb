import { fireEvent, waitFor } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { currentUser, signoutUser } from 'test/mocks'
import { render } from 'test/render'
import { waitForResponse } from 'test/utils'
import { Layout } from '~/components/layout'

describe('components/layout', () => {
  it('should render', async () => {
    const { container, getByRole, getByTestId, queryByTestId } = render(
      <Layout title='Test Page'>
        <main role='main' />
      </Layout>,
      {
        mocks: [
          currentUser.isSignedIn,
          signoutUser.success,
          currentUser.isNotSignedIn
        ]
      }
    )

    await waitFor(() => {
      expect(queryByTestId('signout')).toBeInTheDocument()
    })

    expect(getByRole('banner')).toBeInTheDocument()
    expect(getByRole('main')).toBeInTheDocument()
    expect(getByRole('contentinfo')).toBeInTheDocument()
    expect(getByRole('navigation')).toBeInTheDocument()

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()

    const signout = getByTestId('signout')
    await waitFor(() => {
      expect(signout).not.toBeDisabled()
    })

    fireEvent.click(signout)
    await waitForResponse()
    await waitFor(() => {
      expect(queryByTestId('signout')).not.toBeInTheDocument()
    })

    const select = getByTestId('theme')
    expect(select).toHaveValue('light')

    fireEvent.change(select, { target: { value: 'dark' } })
    await waitFor(() => {
      expect(select).toHaveValue('dark')
    })
  })
})
