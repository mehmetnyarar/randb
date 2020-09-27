import { createContext } from 'react'
import { AuthContext } from './types'

/**
 * Default value for the authentication context.
 */
export const DEFAULT_AUTH: AuthContext = {
  skip: false,
  onSkipChange: () => {
    throw new Error('auth/onSkipChange has not been implemented yet!')
  },
  user: undefined,
  initializing: undefined,
  getCurrentUser: () => {
    throw new Error('auth/getCurrentUser has not been implemented yet!')
  },
  currentUserError: undefined,
  loading: undefined,
  signin: () => {
    throw new Error('auth/signin has not been implemented yet!')
  },
  signinError: undefined,
  signout: () => {
    throw new Error('auth/signout has not been implemented yet!')
  },
  signoutError: undefined
}

/**
 * Authentication context.
 */
export const Auth = createContext<AuthContext>(DEFAULT_AUTH)
