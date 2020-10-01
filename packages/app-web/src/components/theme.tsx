import { ColorScheme, COLOR_SCHEMES, Theme } from '@app/ui'
import React, { useContext } from 'react'
import { useTranslation } from '~/i18n'

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
        <label htmlFor='theme'>{t('theme')}</label>
        <select
          id='theme'
          value={scheme}
          onChange={e => onSchemeChange(e.target.value as ColorScheme)}
          data-testid='theme'
        >
          {COLOR_SCHEMES.map(option => (
            <option key={option} value={option}>
              {t(`theme.${option}`)}
            </option>
          ))}
        </select>
      </div>

      <style jsx>
        {`
          .app-theme {
            margin-top: 16px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-right: 8px;
          }
          .app-theme label {
            margin-right: 8px;
          }
          .app-theme select {
          }
        `}
      </style>
    </>
  )
}
