import { fireEvent } from '@testing-library/dom'
import React, { useContext } from 'react'
import { render } from 'test/render'
import { Snack } from '~/modules'

// #region Setup

interface Props {}

const Component: React.FC<Props> = () => {
  const { message, show, hide } = useContext(Snack)

  if (!message) {
    return (
      <button
        type='button'
        data-testid='show'
        onClick={() => {
          show({
            type: 'info',
            title: 'Test',
            content: 'Message'
          })
        }}
      />
    )
  }

  const { type, title, content } = message
  return (
    <>
      <span data-testid='type'>{type}</span>
      <span data-testid='title'>{title}</span>
      <span data-testid='content'>{content}</span>
      <button type='button' data-testid='hide' onClick={hide} />
    </>
  )
}

// #endregion

describe('modules/snack', () => {
  it('should render snack', () => {
    const { getByTestId, queryByTestId } = render(<Component />)

    const show = getByTestId('show')
    fireEvent.click(show)
    expect(getByTestId('type')).toHaveTextContent(/info/)
    expect(getByTestId('title')).toHaveTextContent(/Test/)
    expect(getByTestId('content')).toHaveTextContent(/Message/)

    const hide = getByTestId('hide')
    fireEvent.click(hide)
    expect(queryByTestId('show')).toBeInTheDocument()
  })
})
