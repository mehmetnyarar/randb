import React from 'react'
import { render } from 'test/render'
import { FieldErrorItem } from '~/components/form'

describe('components/form/field-error-item', () => {
  it('should render null (no error)', () => {
    const { queryByText } = render(<FieldErrorItem />)
    expect(queryByText(/error message/i)).toBeFalsy()
  })

  it('should render null (invalid error)', () => {
    const { queryByText } = render(<FieldErrorItem error={[]} />)
    expect(queryByText(/error message/i)).toBeFalsy()
  })

  it('should render error (string)', () => {
    const { queryByText } = render(<FieldErrorItem error='error message' />)
    expect(queryByText(/error message/i)).toBeTruthy()
  })

  it('should render error (object)', () => {
    const { queryByText } = render(
      <FieldErrorItem error={{ message: 'error message' }} />
    )
    expect(queryByText(/error message/i)).toBeTruthy()
  })
})
