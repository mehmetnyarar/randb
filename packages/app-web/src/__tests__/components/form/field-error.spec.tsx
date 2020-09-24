import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { FieldError } from '~/components/form'

describe('components/form/field-error', () => {
  it('should render null (no error)', async () => {
    const { queryByTestId } = render(<FieldError />)
    expect(queryByTestId('field-error')).not.toBeInTheDocument()
  })

  it('should render null (invalid error)', async () => {
    const { queryByTestId } = render(<FieldError error={[]} />)
    expect(queryByTestId('field-error')).not.toBeInTheDocument()
  })

  it('should render error (string)', async () => {
    const { container, getByTestId } = render(
      <FieldError error='error message' />
    )

    const component = getByTestId('field-error')
    expect(component).toHaveAttribute('class', 'field-error')
    expect(component).toHaveTextContent(/error message/)

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()
  })

  it('should render error (object)', async () => {
    const { container, getByTestId } = render(
      <FieldError error={{ message: 'error message' }} />
    )

    const component = getByTestId('field-error')
    expect(component).toHaveAttribute('class', 'field-error')
    expect(component).toHaveTextContent(/error message/)

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()
  })
})
