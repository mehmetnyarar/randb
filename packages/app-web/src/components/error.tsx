import { Theme } from '@app/ui'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useTranslation } from '~/i18n'
import { Divider } from './divider'

interface Props {
  statusCode?: number
}

/**
 * Error.
 */
export const Error: React.FC<Props> = ({ statusCode }) => {
  const { t } = useTranslation()
  const { palette } = useContext(Theme)
  const { replace, asPath } = useRouter()

  useEffect(() => {
    if (statusCode === 401) {
      replace(`/signin?returnUrl=${asPath}`)
    }
  }, [statusCode, replace, asPath])

  return (
    <>
      <main role='main'>
        <section className='error'>
          {statusCode && (
            <>
              <span className='error-code'>{statusCode}</span>
              <Divider vertical margin={16} />
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
          .error-message {
            color: ${palette['text-hint-color']};
          }
        `}
      </style>
    </>
  )
}
