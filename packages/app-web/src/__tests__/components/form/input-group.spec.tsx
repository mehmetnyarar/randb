import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { InputGroup } from '~/components/form'

describe('components/form/input-group', () => {
  it('should render', async () => {
    const { container, getByTestId } = render(
      <InputGroup>
        <label htmlFor='test'>Test</label>
        <input id='test' name='test' />
      </InputGroup>
    )

    const component = getByTestId('input-group')
    expect(component).toBeInTheDocument()
    expect(component).toHaveAttribute('class', 'input-group')
    expect(component.children).toHaveLength(2)

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()
  })
})
