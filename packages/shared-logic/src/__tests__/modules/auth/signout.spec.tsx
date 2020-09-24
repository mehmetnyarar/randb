import { fireEvent, waitFor } from '@testing-library/react'
import React, { useContext } from 'react'
import { currentUser, signoutUser } from 'test/mocks'
import { render } from 'test/render'
import { SignoutUserInput } from '~/graphql'
import { Auth } from '~/modules/auth'

// #region Setup

interface Props {
  input: SignoutUserInput
}

const Component: React.FC<Props> = () => {
  const { user, loading, signout, signoutError } = useContext(Auth)

  return (
    <>
      {user && <span data-testid='user'>{user.name.first}</span>}
      {loading && <span data-testid='loading'>...</span>}
      {signoutError && (
        <ul data-testid='errors'>
          {signoutError.messages.map((m, i) => (
            <li key={i} data-testid='error'>
              {m}
            </li>
          ))}
        </ul>
      )}
      <button data-testid='signout' onClick={signout} />
    </>
  )
}

// #endregion

describe('modules/auth/signout', () => {
  it('should be successful', async () => {
    const { getByTestId, queryByTestId } = render(
      <Component input={signoutUser.successInput} />,
      {
        mocks: [
          currentUser.isSignedIn,
          signoutUser.success,
          currentUser.isNotSignedIn
        ]
      }
    )

    await waitFor(() => {
      expect(getByTestId('user')).toBeInTheDocument()
    })

    const signout = getByTestId('signout')
    fireEvent.click(signout)
    expect(getByTestId('loading')).toHaveTextContent(/.../)

    await waitFor(() => {
      expect(queryByTestId('user')).not.toBeInTheDocument()
    })
  })

  it('should fail', async () => {
    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <Component input={signoutUser.failureInput} />,
      {
        mocks: [currentUser.isNotSignedIn, signoutUser.failure]
      }
    )

    await waitFor(() => {
      expect(queryByTestId('user')).not.toBeInTheDocument()
    })

    const signout = getByTestId('signout')
    fireEvent.click(signout)
    expect(getByTestId('loading')).toHaveTextContent(/.../)

    await waitFor(() => {
      expect(getByTestId('errors')).toBeTruthy()
      expect(getAllByTestId('error')).toHaveLength(1)
    })
  })
})
