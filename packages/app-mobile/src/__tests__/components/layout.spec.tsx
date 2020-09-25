import React from 'react'
import { render } from 'test/render'
import { Layout } from '~/components/layout'

describe('components/layout', () => {
  it('should render without title', () => {
    const { queryByA11yLabel } = render(<Layout />)
    expect(queryByA11yLabel(/top nav/i)).toBeFalsy()
  })

  it('should render with title', () => {
    const { queryByA11yLabel } = render(<Layout title='Test' />)
    expect(queryByA11yLabel(/top nav/i)).toBeTruthy()
    test.todo('Test the title text')
  })
})
