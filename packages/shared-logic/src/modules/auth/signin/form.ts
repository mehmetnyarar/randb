import { yupResolver } from '@hookform/resolvers'
import { useTypedController } from '@hookform/strictly-typed'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { CurrentUser, SigninUserInput } from '../../../graphql'
import { Logger } from '../../../logger'
import { storage } from '../../../storage'
import { Auth } from '../context'
import {
  DEFAULT_SIGNIN_METHOD,
  DEFAULT_SIGNIN_VALUES,
  validationSchema
} from './const'
import {
  SigninMethod,
  UseSigninFormOptions,
  UseSigninFormResult
} from './types'

const logger = Logger.create({
  src: 'auth/signin'
})

/**
 * User signin form hook.
 * @param [options] Options.
 */
export const useSigninUserForm = (
  options: UseSigninFormOptions = {}
): UseSigninFormResult => {
  const { initialValues = {}, onSuccess } = options
  const { signin, loading, signinError: error } = useContext(Auth)
  const [result, setResult] = useState<CurrentUser | undefined>()

  // #region Signin Method

  const [method, setMethod] = useState<SigninMethod>(DEFAULT_SIGNIN_METHOD)
  const altMethod = useMemo<SigninMethod>(
    () => (method === 'email' ? 'phone' : 'email'),
    [method]
  )
  const onMethodChange = useCallback(
    async (value = altMethod) => {
      setMethod(value)
      await storage.set('signin-method', value)
    },
    [altMethod]
  )

  // #endregion

  // #region Password Visibility

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const onTogglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible)
  }, [isPasswordVisible])

  // #endregion

  // #region Form

  const form = useForm<SigninUserInput, {}>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...DEFAULT_SIGNIN_VALUES,
      ...initialValues
    }
  })

  const { control } = form
  const TypedController = useTypedController<SigninUserInput>({
    control
  })

  const { isDirty, isSubmitting } = form.formState
  const isDisabled = useMemo(() => {
    const isInvalid = !isDirty
    logger.debug('isDisabled', {
      loading,
      isDirty,
      isSubmitting,
      isInvalid
    })
    return loading || isInvalid || isSubmitting
  }, [loading, isDirty, isSubmitting])

  const onValid = useCallback<SubmitHandler<SigninUserInput>>(
    async values => {
      try {
        const user = await signin(values)

        setResult(user)
        user && onSuccess && onSuccess(user)
      } catch (error) {
        logger.debug('onValid/error', { error })
      }
    },
    [onSuccess, signin]
  )
  const onInvalid = useCallback<SubmitErrorHandler<SigninUserInput>>(errors => {
    logger.error('onInvalid', { errors })
  }, [])

  // #endregion

  // #region Initialize

  useEffect(() => {
    storage.get('signin-method').then(value => {
      if (value && value !== method) {
        setMethod(value as SigninMethod)
      }
    })
  }, [method])

  // #endregion

  return {
    method,
    altMethod,
    onMethodChange,
    isPasswordVisible,
    onTogglePasswordVisibility,
    ...form,
    TypedController,
    isDisabled,
    onInvalid,
    onValid,
    loading,
    result,
    error
  }
}
