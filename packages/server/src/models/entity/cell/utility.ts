import { Scenario } from './enum'

/**
 * Determines the scenario of a cell.
 * @param value Value.
 * @returns Scenario.
 */
export const toScenario = (value = '') => {
  if (value.includes('In')) return Scenario.INDOOR
  if (value.includes('Out')) return Scenario.INDOOR
  return Scenario.NONE
}
