import { Yup } from '../../../../form'
import {
  PersonGender,
  PersonNameInput,
  PhoneNumberInput,
  UpsertUserInput,
  UserRole
} from '../../../../graphql'
import { phoneNumberRegex } from '../../../embed'

const { cc, dc, sn } = phoneNumberRegex

/**
 * Initial values.
 */
export const DEFAULT_UPSERT_USER_VALUES: UpsertUserInput = {
  id: undefined,
  name: {
    first: '',
    last: ''
  },
  email: '',
  phone: {
    cc: '',
    dc: '',
    sn: ''
  },
  gender: PersonGender.UNSPECIFIED,
  birthday: undefined,
  password: '',
  roles: [UserRole.USER]
}

/**
 * Validation schema.
 */
export const validationSchema = Yup.object<UpsertUserInput>({
  name: Yup.object<PersonNameInput>({
    first: Yup.string().max(25).required(),
    last: Yup.string().max(25).required()
  }).required(),
  email: Yup.string().email().required(),
  phone: Yup.object<PhoneNumberInput>({
    cc: Yup.string().matches(cc).required(),
    dc: Yup.string().matches(dc).required(),
    sn: Yup.string().matches(sn).required()
  }).required(),
  gender: Yup.string().oneOf(Object.values(PersonGender)).required(),
  birthday: Yup.date().nullable(),
  password: Yup.string(),
  roles: Yup.array<UserRole>().required()
})
