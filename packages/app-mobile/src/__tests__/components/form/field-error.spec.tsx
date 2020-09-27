import React from 'react'
import { render } from 'test/render'
import { FieldError } from '~/components/form'

describe('components/form/field-error', () => {
  it('should render null (no error)', () => {
    const { queryByText } = render(<FieldError />)
    expect(queryByText(/error message/i)).toBeFalsy()
  })

  it('should render null (invalid error)', () => {
    const { queryByText } = render(<FieldError error={[]} />)
    expect(queryByText(/error message/i)).toBeFalsy()
  })

  it('should render error (string)', () => {
    const { queryByText } = render(<FieldError error='error message' />)
    expect(queryByText(/error message/i)).toBeTruthy()
  })

  it('should render error (object)', () => {
    const { queryByText } = render(
      <FieldError error={{ message: 'error message' }} />
    )
    expect(queryByText(/error message/i)).toBeTruthy()
  })
})
