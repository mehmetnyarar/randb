import { CurrentUser } from '~/modules/auth'

declare global {
  namespace Express {
    interface Request {
      user?: CurrentUser
    }
  }
}
