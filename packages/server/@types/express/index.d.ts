/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CurrentUser } from '~/modules/auth'

declare global {
  namespace Express {
    interface Request {
      user?: CurrentUser
    }
  }
}
