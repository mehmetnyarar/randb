import { Theme } from '@app/ui'
import React, { useContext } from 'react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'
import { useTranslation } from '~/i18n'
import { GhostButton } from './button'

interface Props {}

/**
 * Theme selection.
 */
export const ThemeSelection: React.FC<Props> = () => {
  const { t } = useTranslation()
  const { scheme, onSchemeChange } = useContext(Theme)

  return (
    <>
      <div className='app-theme'>
        <span>{t('theme')}</span>
        <GhostButton
          aria-label={t('theme')}
          onClick={() => onSchemeChange(scheme === 'light' ? 'dark' : 'light')}
        >
          {scheme === 'light' ? <RiSunLine /> : <RiMoonLine />}
        </GhostButton>
      </div>

      <style jsx>
        {`
          .app-theme {
            margin-right: 8px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }
        `}
      </style>
    </>
  )
}
