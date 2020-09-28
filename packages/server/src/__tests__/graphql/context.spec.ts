import { httpContext, wsContext } from 'test/mocks'
import { GraphQLContextConnection } from '~/graphql'
import { context, getLang } from '~/graphql/context'
import { Language } from '~/models'
import { I18N } from '~/modules'

// #region Setup

const connection: GraphQLContextConnection = {
  query: '',
  variables: {},
  operationName: '',
  context: wsContext
}

// #endregion

describe('graphql/context', () => {
  it('should return language', () => {
    expect(getLang()).toBe(I18N.defaultLanguage)
    expect(getLang('de')).toBe(I18N.defaultLanguage)
    expect(getLang('en-US')).toBe(Language.en)
    expect(getLang('kz-KZ')).toBe(Language.kz)
    expect(getLang('ru-RU')).toBe(Language.ru)
    expect(getLang('tr-TR')).toBe(Language.tr)
  })

  it('should create a context', async () => {
    const result = await context(httpContext)
    expect(result).toEqual(httpContext)
  })

  it('should return context from the connection', async () => {
    const result = await context({ ...httpContext, connection })
    expect(result).toEqual(wsContext)
  })
})
