import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { FieldErrorList } from '~/components/form'

describe('components/form/field-error-list', () => {
  it('should render null (no errors)', async () => {
    const { queryByTestId } = render(<FieldErrorList />)
    expect(queryByTestId('field-error-list')).not.toBeInTheDocument()
  })

  it('should render null (empty array)', async () => {
    const { queryByTestId } = render(<FieldErrorList errors={[]} />)
    expect(queryByTestId('field-error-list')).not.toBeInTheDocument()
  })

  it('should render null (invalid error)', async () => {
    const { queryByTestId } = render(<FieldErrorList errors='error message' />)
    expect(queryByTestId('field-error-list')).not.toBeInTheDocument()
  })

  it('should render error (string array)', async () => {
    const { container, getByTestId, getAllByTestId } = render(
      <FieldErrorList errors={['error message']} />
    )

    const component = getByTestId('field-error-list')
    expect(component).toHaveAttribute('class', 'field-error-list')

    const children = getAllByTestId('field-error-item')
    expect(children).toHaveLength(1)
    expect(children[0]).toHaveTextContent(/error message/)

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()
  })

  it('should render error (object array)', async () => {
    const { container, getByTestId, getAllByTestId } = render(
      <FieldErrorList
        errors={[
          { message: 'error message 1' },
          { message: 'error message 2' }
        ]}
      />
    )

    const component = getByTestId('field-error-list')
    expect(component).toHaveAttribute('class', 'field-error-list')

    const children = getAllByTestId('field-error-item')
    expect(children).toHaveLength(2)
    expect(children[0]).toHaveTextContent(/error message 1/)
    expect(children[1]).toHaveTextContent(/error message 2/)

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()
  })
})
