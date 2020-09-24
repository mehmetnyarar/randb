import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { FieldErrorItem } from '~/components/form'

describe('components/form/field-error-item', () => {
  it('should render null (no error)', async () => {
    const { queryByTestId } = render(
      <ul>
        <FieldErrorItem />
      </ul>
    )
    expect(queryByTestId('field-error-item')).not.toBeInTheDocument()
  })

  it('should render null (invalid error)', async () => {
    const { queryByTestId } = render(
      <ul>
        <FieldErrorItem error={[]} />
      </ul>
    )
    expect(queryByTestId('field-error-item')).not.toBeInTheDocument()
  })

  it('should render error (string)', async () => {
    const { container, getByTestId } = render(
      <ul>
        <FieldErrorItem error='error message' />
      </ul>
    )

    const component = getByTestId('field-error-item')
    expect(component).toHaveAttribute('class', 'field-error-item')
    expect(component).toHaveTextContent(/error message/)

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()
  })

  it('should render error (object)', async () => {
    const { container, getByTestId } = render(
      <ul>
        <FieldErrorItem error={{ message: 'error message' }} />
      </ul>
    )

    const component = getByTestId('field-error-item')
    expect(component).toHaveAttribute('class', 'field-error-item')
    expect(component).toHaveTextContent(/error message/)

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()
  })
})
