import { TFunction } from 'i18next'
import { GraphQLContext } from '~/graphql'
import { Language } from '~/models'

const t: TFunction = jest.fn().mockImplementation(value => value)

export const httpContext: GraphQLContext = {
  req: {
    languages: ['en'],
    language: 'en',
    i18n: {
      changeLanguage: jest.fn()
    },
    t
  } as never,
  res: {
    cookie: jest.fn(),
    clearCookie: jest.fn()
  } as never,
  t,
  lang: Language.en,
  auth: false,
  currentUser: undefined
}

export const wsContext: GraphQLContext = {
  ...httpContext,
  req: { ...httpContext.req, method: 'ws' } as never,
  res: { method: 'ws' } as never
}
