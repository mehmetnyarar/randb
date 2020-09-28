import i18next from 'i18next'
import Backend, { i18nextFsBackend } from 'i18next-fs-backend'
import Middleware, { LanguageDetector } from 'i18next-http-middleware'
import { join } from 'path'
import { LOCALES_DIR } from '~/config'
import { I18N } from '~/modules'

// Backend options
// https://github.com/i18next/i18next-fs-backend#backend-options
const backend: i18nextFsBackend.i18nextFsBackendOptions = {
  loadPath: join(LOCALES_DIR, '{{lng}}/common.json'),
  addPath: join(LOCALES_DIR, '{{lng}}/missing.json')
}

// Detection options
// https://github.com/i18next/i18next-http-middleware#detector-options
const detection: any = {
  order: ['header', 'cookie'],
  lookupCookie: 'i18next',
  lookupHeader: 'accept-language',
  ignoreCase: false,
  caches: false
}

// initialize i18next
i18next
  .use(LanguageDetector)
  .use(Backend)
  .init({
    backend,
    detection,
    load: 'languageOnly',
    preload: I18N.supportedLanguages,
    whitelist: I18N.supportedLanguages,
    fallbackLng: I18N.defaultLanguage,
    interpolation: { escapeValue: false },
    pluralSeparator: '#',
    keySeparator: false,
    debug: false
  })

/**
 * i18n middleware.
 */
export const middleware = Middleware.handle(i18next, {
  ignoreRoutes: [],
  removeLngFromUrl: false
})
