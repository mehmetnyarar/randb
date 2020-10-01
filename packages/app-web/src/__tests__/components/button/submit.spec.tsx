import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { SubmitButton } from '~/components/button'

describe('components/button/submit', () => {
  it('should render', async () => {
    const { container, getByTestId } = render(<SubmitButton>Test</SubmitButton>)

    const component = getByTestId('submit')
    expect(component).toBeInTheDocument()
    expect(component).toHaveAttribute('type', 'submit')

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()
  })
})
