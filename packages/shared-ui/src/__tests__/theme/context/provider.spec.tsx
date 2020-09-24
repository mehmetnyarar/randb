import { render } from '@testing-library/react'
import React from 'react'
import { DEFAULT_THEME } from '~/theme/context/const'
import { ThemeProvider } from '~/theme/context/provider'

describe('theme/context/provider', () => {
  it('should render', () => {
    const { asFragment, debug } = render(<ThemeProvider />)
    debug()
    expect(asFragment()).toMatchInlineSnapshot('<DocumentFragment />')
  })

  it('should throw an error (default/changeScheme)', () => {
    const { onSchemeChange } = DEFAULT_THEME
    expect(() => {
      onSchemeChange('dark')
    }).toThrow()
  })
})
