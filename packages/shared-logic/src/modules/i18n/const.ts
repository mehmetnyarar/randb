import { Currency, I18n, Language } from '../../graphql'

/**
 * Default i18n settings.
 * Determines which languages and currencies are allowed.
 * Settings should match to the server settings.
 */
export const I18N: I18n = {
  name: 'global',
  supportedCurrencies: [Currency.EUR, Currency.KZT, Currency.TRY, Currency.USD],
  defaultCurrency: Currency.USD,
  supportedLanguages: [Language.en, Language.tr],
  defaultLanguage: Language.en
}
