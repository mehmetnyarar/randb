import { compact, get, isNil, isObject } from 'lodash'
import { isNumeric } from '~/utility'
import {
  CellData,
  CellNameInfo,
  CellNameRule,
  Keys,
  ValidationError,
  ValidationErrors,
  ValidationResult,
  ValidationRule,
  ValidationRules
} from './types'

/**
 * Validates value against a rule.
 * @param value Value.
 * @param rule Validation rule.
 * @returns Error.
 */
export function getError (value: any, rule?: ValidationRule) {
  if (rule) {
    if (rule === 'falsy' && !value) return 'required'
    if (rule === 'nil' && isNil(value)) return 'required'
    if (rule === 'numeric' && !isNumeric(value)) return 'invalid'
    if (typeof rule === 'function' && rule(value)) return 'invalid'

    const oneOf = isObject(rule) && get(rule, 'oneOf')
    if (oneOf && !oneOf.includes(value)) return 'invalid'
  }

  return undefined
}

/**
 * Validates cell data.
 * @param item Cell data.
 * @param rules Validation rules.
 * @returns Validation result.
 */
export function validate<T extends CellData> (
  item: T,
  rules: ValidationRules<T>
): ValidationResult {
  let keys = Object.keys(rules) as Keys<T>
  const errors = keys.reduce((obj, key) => {
    const rule = rules[key]
    const value = item[key]

    let error: ValidationError | undefined
    if (Array.isArray(rule)) {
      const e = compact(rule.map(r => getError(value, r)))
      error = e.length ? 'invalid' : undefined
    } else {
      error = getError(value, rule as ValidationRule)
    }

    return { ...obj, [key]: error }
  }, {} as ValidationErrors<T>)

  keys = Object.keys(errors) as Keys<T>
  const missing = keys.filter(key => errors[key] === 'required')
  const invalid = keys.filter(key => errors[key] === 'invalid')

  return {
    isValid: !missing.length && !invalid.length,
    missing: missing.length ? missing.join(', ') : undefined,
    invalid: invalid.length ? invalid.join(', ') : undefined
  } as ValidationResult
}

/**
 * Extracts information from a cell name.
 * @param name Cell name.
 * @param rules Rules.
 * @returns Cell name info.
 */
export function getCellNameInfo (
  name: string,
  rules: CellNameRule[]
): CellNameInfo {
  const rule = rules.find(rule => name.length === rule.length)

  if (rule) {
    return {
      site: name.slice(rule.site.start, rule.site.end),
      sector: name.slice(rule.sector.start, rule.sector.end),
      n1: name.slice(rule.n1.start, rule.n1.end),
      n2: name.slice(rule.n2)
    }
  }

  return {}
}
