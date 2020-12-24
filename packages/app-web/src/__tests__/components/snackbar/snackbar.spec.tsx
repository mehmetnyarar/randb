import { Snack } from '@app/logic'
import { fireEvent } from '@testing-library/dom'
import React, { useContext } from 'react'
import { render } from 'test/utils'

// #region Setup

const Component: React.FC = () => {
  const { show } = useContext(Snack)
  return (
    <div>
      <button
        data-testid='show-snack'
        onClick={() =>
          show({
            type: 'info',
            title: 'Test',
            content: 'Message'
          })}
      >
        Show
      </button>
    </div>
  )
}

// #endregion

describe('components/snackbar', () => {
  it('should render', () => {
    const { getByTestId } = render(<Component />)

    const show = getByTestId('show-snack')
    fireEvent.click(show)

    const snack = getByTestId('snackbar')
    expect(snack).toBeInTheDocument()
  })
})
