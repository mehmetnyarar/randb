import { fireEvent } from '@testing-library/react'
import React from 'react'
import { currentUser, signinUser } from 'test/mocks'
import { render } from 'test/render'
import { waitForResponse } from 'test/utils'
import { SigninUserInput } from '~/graphql'
import { useSigninUserForm } from '~/modules/auth'

// #region Setup

interface Props {
  input: SigninUserInput
}

const Component: React.FC<Props> = ({ input }) => {
  const {
    method,
    altMethod,
    onMethodChange,
    errors,
    onValid,
    loading,
    result,
    error
  } = useSigninUserForm()

  return (
    <>
      <button
        data-testid='onMethodChange'
        onClick={() => onMethodChange('phone')}
      />
      <button data-testid='onSubmit' onClick={() => onValid(input)} />
      <span data-testid='method'>{method}</span>
      <span data-testid='altMethod'>{altMethod}</span>
      {Object.keys(errors).length > 0 && (
        <ul data-testid='input-errors'>
          {Object.values(errors).map((e, i) => (
            <li key={i} data-testid='input-error'>
              {e?.message || Object.values(e || {}).join('. ')}
            </li>
          ))}
        </ul>
      )}
      {loading && <span data-testid='loading'>...</span>}
      {result && <span data-testid='result'>{result.name.first}</span>}
      {error && (
        <ul data-testid='errors'>
          {error.messages.map((m, i) => (
            <li key={i} data-testid='error'>
              {m}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

// #endregion

describe('modules/auth/signin', () => {
  it('should be successful', async () => {
    const { getByTestId } = render(
      <Component input={signinUser.successInput} />,
      { mocks: [currentUser.isNotSignedIn, signinUser.success] }
    )

    expect(getByTestId('method')).toHaveTextContent(/email/)
    expect(getByTestId('altMethod')).toHaveTextContent(/phone/)

    const onMethodChange = getByTestId('onMethodChange')
    fireEvent.click(onMethodChange)
    expect(getByTestId('method')).toHaveTextContent(/phone/)
    expect(getByTestId('altMethod')).toHaveTextContent(/email/)

    const onSubmit = getByTestId('onSubmit')
    fireEvent.click(onSubmit)
    expect(getByTestId('loading')).toHaveTextContent(/.../)

    await waitForResponse()
    expect(getByTestId('result')).toHaveTextContent(/Test/)
  })

  it('should fail', async () => {
    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <Component input={signinUser.failureInput} />,
      { mocks: [currentUser.isNotSignedIn, signinUser.failure] }
    )

    const onSubmit = getByTestId('onSubmit')
    fireEvent.click(onSubmit)
    expect(getByTestId('loading')).toHaveTextContent(/.../)

    await waitForResponse()
    expect(queryByTestId('result')).not.toBeInTheDocument()
    expect(getByTestId('errors')).toBeTruthy()
    expect(getAllByTestId('error')).toHaveLength(1)
  })
})
