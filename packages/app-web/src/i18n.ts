import { I18N } from '@app/logic'
import NextI18Next from 'next-i18next'
import { resolve } from 'path'

const { supportedLanguages, defaultLanguage } = I18N
const otherLanguages = supportedLanguages.filter(
  lang => lang !== defaultLanguage
)

const i18n = new NextI18Next({
  localePath: resolve('./public/static/locales'),
  defaultLanguage,
  otherLanguages,
  interpolation: { escapeValue: false },
  pluralSeparator: '#',
  keySeparator: false,
  debug: false
})

export default i18n
export const {
  appWithTranslation,
  withTranslation,
  useTranslation,
  Trans
} = i18n
