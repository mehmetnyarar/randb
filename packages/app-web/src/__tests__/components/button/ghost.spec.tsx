import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { GhostButton } from '~/components/button'

describe('components/button/ghost', () => {
  it('should render', async () => {
    const { container, getByTestId } = render(<GhostButton>Test</GhostButton>)

    const component = getByTestId('ghost-button')
    expect(component).toBeInTheDocument()
    expect(component).toHaveAttribute('type', 'button')
    expect(component).toHaveAttribute('class', 'ghost')

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()
  })
})
