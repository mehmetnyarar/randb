import React from 'react'
import { render } from 'test/render'
import { FieldErrorList } from '~/components/form'

describe('components/form/field-error-list', () => {
  it('should render null (no errors)', () => {
    const { queryAllByText } = render(<FieldErrorList />)
    expect(queryAllByText(/error message/i)).toHaveLength(0)
  })

  it('should render null (empty array)', () => {
    const { queryAllByText } = render(<FieldErrorList errors={[]} />)
    expect(queryAllByText(/error message/i)).toHaveLength(0)
  })

  it('should render null (invalid error)', () => {
    const { queryAllByText } = render(<FieldErrorList errors='error message' />)
    expect(queryAllByText(/error message/i)).toHaveLength(0)
  })

  it('should render error (string array)', () => {
    const { queryAllByText } = render(
      <FieldErrorList errors={['error message 1', 'error message 2']} />
    )
    expect(queryAllByText(/error message/i)).toHaveLength(2)
  })

  it('should render error (object array)', () => {
    const { queryAllByText } = render(
      <FieldErrorList
        errors={[
          { message: 'error message 1' },
          { message: 'error message 2' }
        ]}
      />
    )
    expect(queryAllByText(/error message/i)).toHaveLength(2)
  })
})
