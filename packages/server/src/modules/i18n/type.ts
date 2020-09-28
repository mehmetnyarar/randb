import { Field, ObjectType } from 'type-graphql'
import { Currency, Language } from '~/models'

/**
 * I18n settings.
 */
@ObjectType()
export class I18n {
  @Field()
  name!: string

  @Field(() => [Currency])
  supportedCurrencies!: Currency[]

  @Field(() => Currency)
  defaultCurrency!: Currency

  @Field(() => [Language])
  supportedLanguages!: Language[]

  @Field(() => Language)
  defaultLanguage!: Language
}
