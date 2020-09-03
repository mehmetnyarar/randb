import { registerEnumType } from 'type-graphql'

/**
 * Origin of the request.
 */
export enum RequestOrigin {
  WEB = 'WEB',
  MOBILE = 'MOBILE'
}

registerEnumType(RequestOrigin, { name: 'RequestOrigin' })
