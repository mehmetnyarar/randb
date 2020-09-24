import { Snack } from '@app/logic'
import { Theme } from '@app/ui'
import React, { useContext } from 'react'
import Modal, { defaultStyles, Styles } from 'react-modal'
import { getColor } from './utility'

Modal.setAppElement('#snackbar')

interface Props {}

/**
 * Snack bar.
 */
export const SnackBar: React.FC<Props> = () => {
  const { hide, message } = useContext(Snack)
  const { palette } = useContext(Theme)

  if (!message) return null

  const { type, title, content } = message
  const color = getColor(palette, type)
  const themedStyles: Styles = {
    ...defaultStyles,
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      padding: 0,
      borderRadius: '4px',
      border: `1px solid ${color}`,
      background: palette['background-basic-color-1'],
      color: palette['text-basic-color']
    }
  }
  const foreColor = palette['text-alternate-color']

  return (
    <>
      <Modal
        isOpen={!!message}
        onRequestClose={hide}
        style={themedStyles}
        contentLabel='SnackBar'
      >
        <div
          id='snackbar'
          aria-labelledby='SnackBar'
          aria-describedby='Informational dialog'
          data-testid='snackbar'
        >
          <header className='snack-header'>
            <h2 className='snack-title'>{title || type}</h2>
            <button type='button' className='snack-close' onClick={hide}>
              X
            </button>
          </header>
          <div className='snack-content'>
            {typeof content === 'string' ? content : <p>{content}</p>}
          </div>
        </div>
      </Modal>

      <style jsx>
        {`
          .snack-header {
            padding: 16px;
            background: ${color};
            color: ${foreColor};
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .snack-title {
            margin: 0;
          }
          .snack-close {
            cursor: pointer;
            border: none;
            outline: none;
            padding: 2px 6px;
            border-radius: 4px;
            background: ${foreColor};
            color: ${color};
            transition: all 0.4s ease;
          }
          .snack-close:hover {
            background: ${color};
            color: ${foreColor};
          }
          .snack-content {
            padding: 8px 16px;
          }
        `}
      </style>
    </>
  )
}
