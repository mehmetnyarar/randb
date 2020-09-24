import React from 'react'
import { Auth } from './context'
import { AuthOptions } from './types'
import { useAuth } from './use'

/**
 * Authentication provider.
 * @param props Props.
 */
export const AuthProvider: React.FC<AuthOptions> = ({
  children,
  ...options
}) => {
  const auth = useAuth(options)
  return <Auth.Provider value={auth}>{children}</Auth.Provider>
}
