import { CorsOptions } from 'cors'
import { CORS_ALLOWED, CORS_BLOCKED } from './env'

/**
 * Cors custom origin validator.
 * @see `@types/cors`
 */
export type CustomOrigin = (
  requestOrigin: string | undefined,
  callback: (err: Error | null, allow?: boolean) => void
) => void

/**
 * CORS options.
 * @see env/CORS_*
 */
export const CORS_OPTIONS: CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    const allowed =
      !origin ||
      (CORS_ALLOWED.includes(origin) && !CORS_BLOCKED.includes(origin))

    if (allowed) {
      callback(null, true)
    } else {
      console.debug(`Blocked by CORS! (${origin})`, {
        CORS_ALLOWED,
        CORS_BLOCKED
      })
      callback(new Error(`Blocked by CORS! (${origin})`), false)
    }
  }
}
