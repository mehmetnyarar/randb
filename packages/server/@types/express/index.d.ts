/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18n, TFunction } from 'i18next'
import { CurrentUser } from '~/modules'

declare global {
  namespace Express {
    interface Request {
      t: TFunction
      i18n: i18n
      language: string
      languages: string[]
      user?: CurrentUser
    }
  }
}
