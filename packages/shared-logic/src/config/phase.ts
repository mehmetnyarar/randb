/**
 * Application phase.
 */
export type Phase = 'development' | 'test' | 'production'

/**
 * Determines whether the app is in development phase or not.
 * @param [phase=process.env.NODE_ENV] Phase.
 * @returns True if the condition is met.
 */
export const isDevelopment = (phase?: Phase) =>
  (phase || process.env.NODE_ENV) === 'development'

/**
 * Determines whether the app is in production phase or not.
 * @param [phase=process.env.NODE_ENV] Phase.
 * @returns True if the condition is met.
 */
export const isProduction = (phase?: Phase) =>
  (phase || process.env.NODE_ENV) === 'production'

/**
 * Determines whether the app is in test phase or not.
 * @param [phase=process.env.NODE_ENV] Phase.
 * @returns True if the condition is met.
 */
export const isTest = (phase?: Phase) =>
  (phase || process.env.NODE_ENV) === 'test'
