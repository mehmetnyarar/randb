import { Snack } from '@app/logic'
import { Theme } from '@app/ui'
import React, { useContext } from 'react'
import Modal, { Styles } from 'react-modal'
import { useTranslation } from '~/i18n'
import { getColor } from './utility'

interface Props {}

/**
 * Snack bar.
 */
export const SnackBar: React.FC<Props> = () => {
  const { hide, message } = useContext(Snack)
  const { palette } = useContext(Theme)
  const { t } = useTranslation()

  if (!message) return null

  const { type, title, content } = message
  const color = getColor(palette, type)
  const foreColor = palette['text-basic-color']
  const themedStyles: Styles = {
    // ...defaultStyles,
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
      color: foreColor
    }
  }

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
          aria-labelledby={t('snack.a11y.label')}
          aria-describedby={t('snack.a11y.description')}
          data-testid='snackbar'
        >
          <header className='snack-header'>
            <h2 className='snack-title'>{title || t(`msg.${type}`)}</h2>
            <button
              type='button'
              title={t('close')}
              onClick={hide}
              className='snack-close'
            >
              X
            </button>
          </header>
          <div className='snack-content'>
            {typeof content === 'string' ? <p>{content}</p> : content}
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
