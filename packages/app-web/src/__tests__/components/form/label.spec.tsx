import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { Label } from '~/components/form'

describe('components/form/label', () => {
  it('should render', async () => {
    const { container, getByTestId } = render(
      <>
        <Label htmlFor='test'>Test</Label>
        <input id='test' name='test' />
      </>
    )

    const component = getByTestId('label')
    expect(component).toBeInTheDocument()
    expect(component).toHaveAttribute('class', 'label')
    expect(component).toHaveTextContent(/test/i)

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()
  })
})
