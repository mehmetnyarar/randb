import { registerEnumType } from 'type-graphql'

/**
 * Person's gender.
 */
export enum PersonGender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER',
  UNSPECIFIED = 'UNSPECIFIED'
}

registerEnumType(PersonGender, { name: 'PersonGender' })
