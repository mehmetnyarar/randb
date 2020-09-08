/**
 * Cell data (row).
 */
export interface CellData {}

/**
 * Data keys (columns).
 */
export type Keys<T extends CellData = {}> = (keyof T)[]

/**
 * Validation rule.
 */
export type ValidationRule =
  | 'falsy' // Report error if the field value is falsy
  | 'nil' // Report error if the field value is null or undefined
  | 'numeric' // Report error if the field value is not a number
  | { oneOf: any[] } // Report error if the value is not one of the values
  | ((value: any) => boolean) // Report error if the result of a custom validation is true

/**
 * Validation rules.
 */
export type ValidationRules<T extends CellData = {}> = {
  [K in keyof T]?: ValidationRule | ValidationRule[]
}

/**
 * Validation result.
 */
export type ValidationError = 'required' | 'invalid'

/**
 * Validation errors.
 */
export type ValidationErrors<T extends CellData = {}> = {
  [K in keyof T]?: ValidationError
}

/**
 * Validation result.
 */
export interface ValidationResult {
  isValid?: boolean
  missing?: string
  invalid?: string
}

/**
 * Rule for cell name.
 */
export interface CellNameRule {
  length: number
  site: { start: number; end: number }
  sector: { start: number; end: number }
  n1: { start: number; end: number }
  n2: number
}

/**
 * Cell name info.
 */
export interface CellNameInfo {
  site?: string
  sector?: string
  n1?: string
  n2?: string
}
