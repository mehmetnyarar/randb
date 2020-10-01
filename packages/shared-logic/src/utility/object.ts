/**
 * Recursively removes keys from an object.
 * @param obj Object.
 * @param omit Keys to omit.
 * @returns Object.
 */
export function omitDeep<T> (obj: T, omit: Array<number | string>) {
  if (!obj) return obj

  const updated = Object.entries(obj).reduce((next, [key, value]) => {
    const exclude = omit.includes(key)
    if (exclude) return next

    if (Array.isArray(value)) {
      const nextValue = value.map(item => {
        return typeof item === 'object' ? omitDeep(item, omit) : item
      })

      next[key] = nextValue
      return next
    } else if (typeof value === 'object') {
      next[key] = omitDeep(value, omit)
      return next
    }

    next[key] = value
    return next
  }, {} as Record<string, any>)

  return updated as T
}
