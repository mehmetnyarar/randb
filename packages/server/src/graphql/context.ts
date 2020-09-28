import { toString } from 'lodash'
import { GRAPHQL_AUTH } from '~/config'
import { Language } from '~/models'
import { I18N } from '~/modules'
import { GraphQLContext, GraphQLContextFunction } from './types'

// Supported languages
const languages = Object.values(I18N.supportedLanguages).map(toString)

/**
 * Determines the language.
 * @param req Request.
 * @returns Language.
 */
export const getLang = (language = ''): Language => {
  const lang = language.includes('-') ? language.split('-')[0] : language
  return languages.includes(lang) ? (lang as Language) : I18N.defaultLanguage
}

/**
 * Creates a GraphQL context.
 * @param params Context parameters.
 * @returns GraphQL context.
 */
export const context: GraphQLContextFunction = async params => {
  // Create context for subscriptions
  const { connection } = params
  if (connection) {
    return connection.context
  }

  // Create context for queries and mutations
  const { req, res } = params

  const lang = getLang(req.language)
  await req.i18n.changeLanguage(lang)

  const ctx: GraphQLContext = {
    req,
    res,
    t: req.t,
    lang,
    auth: GRAPHQL_AUTH,
    currentUser: req.user
  }

  return ctx
}
