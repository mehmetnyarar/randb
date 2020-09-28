import { registerEnumType } from 'type-graphql'

/**
 * Currency.
 */
export enum Currency {
  EUR = 'EUR',
  KZT = 'KZT',
  TRY = 'TRY',
  USD = 'USD'
}

/**
 * Language.
 */
export enum Language {
  en = 'en',
  kz = 'kz',
  ru = 'ru',
  tr = 'tr'
}

registerEnumType(Currency, { name: 'Currency' })
registerEnumType(Language, { name: 'Language' })
