import { yupResolver } from '@hookform/resolvers/dist/yup'
import { useTypedController } from '@hookform/strictly-typed'
import { generate } from 'generate-password'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { AppError, getCustomError, getGraphQLError } from '../../../../error'
import {
  UpsertUserInput,
  User,
  useUpsertUserMutation,
  useUserLazyQuery
} from '../../../../graphql'
import { Logger } from '../../../../logger'
import { validationSchema } from './const'
import { UseUpsertUserFormOptions, UseUpsertUserFormResult } from './types'
import { getValues } from './utility'

const logger = Logger.create({
  src: 'user/upsert'
})

/**
 * Upsert user form hook.
 * @param [options] Options.
 */
export const useUpsertUserForm = (
  options: UseUpsertUserFormOptions = {}
): UseUpsertUserFormResult => {
  const { onSuccess } = options
  const { username, ...initialValues } = options.initialValues || {}
  const create = useMemo(() => username === 'new', [username])

  // #region Password Visibility

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const onTogglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible)
  }, [isPasswordVisible])

  // #endregion

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<User>()
  const [error, setError] = useState<AppError>()

  // #region Form

  const form = useForm<UpsertUserInput, {}>({
    resolver: yupResolver(validationSchema),
    defaultValues: getValues(initialValues)
  })

  const { control, reset, setValue } = form
  const TypedController = useTypedController<UpsertUserInput>({
    control
  })

  const { isDirty, isSubmitting } = form.formState
  const isDisabled = useMemo(() => {
    const isInvalid = !isDirty
    logger.trace('isDisabled', {
      loading,
      isDirty,
      isSubmitting,
      isInvalid
    })
    return loading || isInvalid || isSubmitting
  }, [loading, isDirty, isSubmitting])

  const [upsertUser] = useUpsertUserMutation()
  const onValid = useCallback<SubmitHandler<UpsertUserInput>>(
    async values => {
      setLoading(true)

      try {
        const initial = getValues(initialValues, result)
        const input = getValues(initial, values)
        logger.debug('onValid/input', { values, initial, input })
        const { data, errors } = await upsertUser({
          variables: {
            data: input
          }
        })

        logger.debug('onValid/result', { input, data, errors })
        if (data && data.upsertUser) {
          const user = data && (data.upsertUser as User)
          const values = getValues(initialValues, user)
          setResult(user)
          reset(values)
          onSuccess && onSuccess(user)
        } else setError(getGraphQLError(errors))
      } catch (ex) {
        logger.debug('onValid/error', { ex })
        setError(getGraphQLError(ex))
      } finally {
        setLoading(false)
      }
    },
    [initialValues, onSuccess, reset, result, upsertUser]
  )
  const onInvalid = useCallback<SubmitErrorHandler<UpsertUserInput>>(errors => {
    logger.error('onInvalid', { errors })
  }, [])

  // #endregion

  // #region Values

  const createPassword = useCallback(() => {
    setValue(
      'password',
      generate({
        length: 12,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
        excludeSimilarCharacters: true,
        strict: true
      })
    )
  }, [setValue])
  const [getUser] = useUserLazyQuery({
    fetchPolicy: 'network-only',
    onError: e => {
      const values = getValues(initialValues)
      logger.debug('getUser/onError', { e, values })
      reset(values)
      setError(getGraphQLError(e))
      setResult(undefined)
      setLoading(false)
    },
    onCompleted: data => {
      const user = data && (data.user as User)
      const values = getValues(initialValues, user)
      const e = !create && !user ? getCustomError('nodata') : undefined
      logger.debug('getUser/onCompleted', { data, user, values, e })
      reset(values)
      setError(e)
      setResult(user)
      setLoading(false)
    }
  })

  // #endregion

  useEffect(() => {
    setError(undefined)
    setResult(undefined)
    setLoading(true)
    getUser({
      variables: {
        filter: {
          username
        }
      }
    })
  }, [getUser, username])

  return {
    create,
    createPassword,
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
