import { registerEnumType } from 'type-graphql'

/**
 * Signin method.
 */
export enum SigninMethod {
  USERNAME = 'USERNAME',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE'
}

registerEnumType(SigninMethod, { name: 'SigninMethod' })
