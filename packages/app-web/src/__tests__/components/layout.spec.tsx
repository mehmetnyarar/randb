import { fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { render } from 'test/render'
import { Layout } from '~/components/layout'

describe('components/layout', () => {
  it('should render', async () => {
    const { container, getByRole, getByLabelText } = render(
      <Layout title='Test Page'>
        <main role='main' />
      </Layout>
    )

    expect(getByRole('banner')).toBeInTheDocument()
    expect(getByRole('main')).toBeInTheDocument()
    expect(getByRole('contentinfo')).toBeInTheDocument()
    expect(getByRole('navigation')).toBeInTheDocument()

    const a11y = await axe(container)
    expect(a11y).toHaveNoViolations()

    const select = getByLabelText(/theme/i)
    expect(select).toHaveValue('light')

    fireEvent.change(select, { target: { value: 'dark' } })
    expect(select).toHaveValue('dark')
  })
})
