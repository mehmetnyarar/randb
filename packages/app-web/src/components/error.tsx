import { Theme } from '@app/ui'
import React, { useContext } from 'react'
import { useTranslation } from '~/i18n'

interface Props {
  statusCode?: number
}

/**
 * Error.
 */
export const Error: React.FC<Props> = ({ statusCode }) => {
  const { t } = useTranslation()
  const { palette } = useContext(Theme)

  return (
    <>
      <main role='main'>
        <section className='error'>
          {statusCode && (
            <>
              <span className='error-code'>{statusCode}</span>
              <div className='divider' />
            </>
          )}
          <span className='error-message'>
            {t(`screen.error.${statusCode}`)}
          </span>
        </section>
      </main>

      <style jsx>
        {`
          main {
            flex: 1;
            align-self: stretch;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .error {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }
          .error-code {
            font-size: 32px;
            color: ${palette['text-hint-color']};
          }
          .divider {
            margin: 0 16px;
            width: 0;
            height: 48px;
            border-right: 1px solid ${palette['text-hint-color']};
          }
          .error-message {
            color: ${palette['text-hint-color']};
          }
        `}
      </style>
    </>
  )
}
