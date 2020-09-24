import { Yup } from '../../../form'
import { PhoneNumberInput, SigninUserInput } from '../../../graphql'
import { phoneNumberRegex } from '../../../models'
import { SigninMethod } from './types'

const { cc, dc, sn } = phoneNumberRegex

/**
 * Default signin method.
 */
export const DEFAULT_SIGNIN_METHOD: SigninMethod = 'email'

/**
 * Initial values.
 */
export const DEFAULT_SIGNIN_VALUES: SigninUserInput = {
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
  email: Yup.string().email(),
  phone: Yup.object<PhoneNumberInput>({
    cc: Yup.string().matches(cc).required(),
    dc: Yup.string().matches(dc).required(),
    sn: Yup.string().matches(sn).required()
  }),
  password: Yup.string().min(8).required()
})
