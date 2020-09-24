import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { Field } from '~/components/form'

describe('components/form/field', () => {
  it('should render', async () => {
    const { container, getByTestId } = render(
      <Field>
        <label htmlFor='test'>Test</label>
        <input id='test' name='test' />
      </Field>
    )

    const component = getByTestId('field')
    expect(component).toBeInTheDocument()
    expect(component).toHaveAttribute('class', 'field')
    expect(component.children).toHaveLength(2)

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()
  })
})
