import { Snack } from '@app/logic'
import { fireEvent } from '@testing-library/react-native'
import React, { useContext } from 'react'
import { Button } from 'react-native'
import { render } from 'test/render'

const Component: React.FC = () => {
  const { show } = useContext(Snack)

  return (
    <Button
      title='Show Snack'
      onPress={() => {
        console.warn('Showing snack now...')
        show({
          type: 'info',
          title: 'Test',
          content: 'Message'
        })
      }}
    />
  )
}

describe('components/snackbar', () => {
  it('should render', async () => {
    const {
      findByText,
      findByA11yLabel,
      queryByText,
      queryByA11yLabel
    } = render(<Component />)

    expect(queryByA11yLabel(/snackbar/)).toBeFalsy()

    const button = await findByText(/show snack/i)
    fireEvent(button, 'press')

    expect(await findByA11yLabel(/snackbar/)).toBeTruthy()
    expect(queryByText(/test/i)).toBeTruthy()
    expect(queryByText(/message/i)).toBeTruthy()

    const close = await findByA11yLabel(/close snackbar/i)
    fireEvent(close, 'press')

    expect(queryByA11yLabel(/snackbar/)).toBeFalsy()
    expect(queryByText(/test/i)).toBeFalsy()
    expect(queryByText(/message/i)).toBeFalsy()
  })
})
