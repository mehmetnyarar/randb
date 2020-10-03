import { registerEnumType } from 'type-graphql'

/**
 * Cell scenario.
 */
export enum Scenario {
  NONE = 'NONE',
  INDOOR = 'INDOOR',
  OUTDOOR = 'OUTDOOR'
}

registerEnumType(Scenario, { name: 'Scenario' })
