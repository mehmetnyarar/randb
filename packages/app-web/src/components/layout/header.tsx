import { Auth, getPersonName } from '@app/logic'
import { Theme } from '@app/ui'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useTranslation } from '~/i18n'
import { PrimaryButton } from '../button'
import { Divider } from '../divider'

interface Props {}

/**
 * App header.
 */
export const Header: React.FC<Props> = () => {
  const { t } = useTranslation()
  const { palette } = useContext(Theme)
  const { user, loading, signout } = useContext(Auth)

  return (
    <>
      <header role='banner' className='app-header'>
        <h2>
          <Link href='/'>
            <a>{t('app.name')}</a>
          </Link>
        </h2>
        <nav className='user-nav' aria-label='User Navigation'>
          {user ? (
            <>
              <span className='user-name'>
                {t('welcome.user', { name: getPersonName(user.name) })}
              </span>
              <Divider vertical margin={16} />
              <PrimaryButton onClick={signout} disabled={loading}>
                {t('auth.signout')}
              </PrimaryButton>
            </>
          ) : (
            <Link href='/signin'>
              <a>{t('auth.signin')}</a>
            </Link>
          )}
        </nav>
      </header>

      <style jsx>
        {`
          .app-header {
            height: 75px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            border-bottom: 1px solid ${palette['border-basic-color-3']};
            background: ${palette['background-basic-color-2']};
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
          }
          .app-header h2 {
            font-variant: petite-caps;
            margin-left: ${user ? 32 : 4}px;
          }

          .user-name {
            display: none;
          }
          @media screen and (min-width: 600px) {
            .user-name {
              display: inline-block;
            }
          }

          .user-nav {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }

          .signout {
            cursor: pointer;
            margin-left: 16px;
            padding: 16px;
            outline: none;
            border: none;
            border-radius: 4px;
            background: ${palette['background-alternative-color-1']};
            color: ${palette['text-alternate-color']};
            transition: background 0.5s ease;
          }
          .signout:hover {
            background: ${palette['background-alternative-color-4']};
          }
        `}
      </style>
    </>
  )
}
