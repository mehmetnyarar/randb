import { Currency, Language } from '~/models'
import { I18n } from './type'

/**
 * Default i18n settings.
 */
export const I18N: I18n = {
  name: 'global',
  supportedCurrencies: [Currency.EUR, Currency.KZT, Currency.TRY, Currency.USD],
  defaultCurrency: Currency.USD,
  supportedLanguages: [Language.en, Language.kz, Language.ru, Language.tr],
  defaultLanguage: Language.en
}
