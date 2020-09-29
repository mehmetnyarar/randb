export const t = (key: string, params?: any) => {
  if (key === 'auth.signin.with') {
    return `auth.signin.with.${params.method}`
  }

  return key
}
