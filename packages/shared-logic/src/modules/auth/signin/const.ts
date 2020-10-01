import { Yup } from '../../../form'
import {
  PhoneNumberInput,
  SigninMethod,
  SigninUserInput
} from '../../../graphql'
import { phoneNumberRegex } from '../../../models'

const { cc, dc, sn } = phoneNumberRegex

/**
 * Initial values.
 */
export const DEFAULT_SIGNIN_VALUES: SigninUserInput = {
  method: SigninMethod.USERNAME,
  username: '',
  email: '',
  phone: {
    cc: '',
    dc: '',
    sn: ''
  },
  password: ''
}

/**
 * Validation schema.
 */
export const validationSchema = Yup.object<SigninUserInput>({
  method: Yup.string().oneOf<SigninMethod>(Object.values(SigninMethod)),
  username: Yup.string(),
  email: Yup.string().email(),
  phone: Yup.object<PhoneNumberInput>({
    cc: Yup.string().matches(cc) as any,
    dc: Yup.string().matches(dc) as any,
    sn: Yup.string().matches(sn) as any
  }),
  password: Yup.string().min(8).required()
})
