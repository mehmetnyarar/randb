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
    cc: Yup.string().matches(cc) as any,
    dc: Yup.string().matches(dc) as any,
    sn: Yup.string().matches(sn) as any
  }),
  password: Yup.string().min(8).required()
})
