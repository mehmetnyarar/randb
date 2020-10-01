import { I18N } from '@app/logic'
import React from 'react'
import { useTranslation } from '~/i18n'

interface Props {}

/**
 * Language selection.
 */
export const LanguageSelection: React.FC<Props> = () => {
  const { t, i18n } = useTranslation()

  return (
    <>
      <div className='app-language'>
        <label htmlFor='language'>{t('language')}</label>
        <select
          id='language'
          value={i18n.language}
          onChange={async e => {
            await i18n.changeLanguage(e.target.value)
            window.location.reload()
          }}
          data-testid='language'
        >
          {I18N.supportedLanguages.map(option => {
            return (
              <option key={option} value={option}>
                {t(`language.${option}`)}
              </option>
            )
          })}
        </select>
      </div>

      <style jsx>
        {`
          .app-language {
            margin-top: 16px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-right: 8px;
          }
          .app-language label {
            margin-right: 8px;
          }
          .app-language select {
          }
        `}
      </style>
    </>
  )
}
