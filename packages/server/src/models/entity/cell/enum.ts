import { registerEnumType } from 'type-graphql'

/**
 * Cell scenario.
 */
export enum Scenario {
  INDOOR = 'Indoor',
  OUTDOOR = 'Outdoor'
}

registerEnumType(Scenario, { name: 'Scenario' })
