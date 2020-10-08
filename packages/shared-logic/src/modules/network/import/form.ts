import { yupResolver } from '@hookform/resolvers'
import { useTypedController } from '@hookform/strictly-typed'
import { merge } from 'lodash'
import { useCallback, useContext, useMemo, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { AppError, getGraphQLError } from '../../../error'
import {
  FileCategory,
  NetworkImportInput,
  NetworkImportReport,
  NetworkLog,
  useImportNetworkMutation
} from '../../../graphql'
import { Logger } from '../../../logger'
import { Network } from '../context'
import { getNetworkImportReport } from '../reporter'
import { DEFAULT_NETWORK_IMPORT_VALUES, validationSchema } from './const'
import {
  UseNetworkImportFormOptions,
  UseNetworkImportFormResult
} from './types'

const logger = Logger.create({
  src: 'network/import'
})

/**
 * Network import form hook.
 * @param [options] Options.
 */
export const useImportNetworkForm = (
  options: UseNetworkImportFormOptions = {}
): UseNetworkImportFormResult => {
  const { initialValues = {}, onSuccess } = options

  const [error, setError] = useState<AppError>()
  const [result, setResult] = useState<NetworkImportReport>()
  const [loading, setLoading] = useState(false)

  // #region Form

  const form = useForm<NetworkImportInput, {}>({
    resolver: yupResolver(validationSchema),
    defaultValues: merge({}, DEFAULT_NETWORK_IMPORT_VALUES, initialValues)
  })

  const { control } = form
  const TypedController = useTypedController<NetworkImportInput>({
    control
  })

  const { errors, isDirty, isSubmitting } = form.formState
  const isDisabled = useMemo(() => {
    const hasErrors = Boolean(Object.keys(errors).length)
    const isInvalid = (isDirty && hasErrors) || !isDirty
    logger.debug('isDisabled', {
      errors,
      hasErrors,
      isDirty,
      isInvalid,
      isSubmitting,
      loading
    })
    return loading || isInvalid || isSubmitting
  }, [errors, isDirty, isSubmitting, loading])

  const { reload } = useContext(Network)
  const [importNetwork] = useImportNetworkMutation()
  const onValid = useCallback<SubmitHandler<NetworkImportInput>>(
    async values => {
      setLoading(true)
      let logs: NetworkLog[] | undefined

      try {
        const input = merge({}, DEFAULT_NETWORK_IMPORT_VALUES, values)
        logger.debug('onValid/input', { input })

        const { data, errors } = await importNetwork({
          variables: {
            data: input,
            options: {
              category: FileCategory.NETWORK,
              directory: 'network/import'
            }
          }
        })

        logger.debug('onValid/result', { data, errors })
        if (data && data.importNetwork) logs = data && data.importNetwork
        else setError(getGraphQLError(errors, 'nodata'))
      } catch (error) {
        logger.debug('onValid/error', { error })
      } finally {
        setLoading(false)

        if (logs && logs.length) {
          const report = getNetworkImportReport(logs)
          onSuccess && onSuccess(report)
          setResult(report)
          reload(values.type)
        }
      }
    },
    [importNetwork, onSuccess, reload]
  )
  const onInvalid = useCallback<SubmitErrorHandler<NetworkImportInput>>(
    errors => {
      logger.error('onInvalid', { errors })
    },
    []
  )

  // #endregion

  const refresh = useCallback(() => {
    setError(undefined)
    setResult(undefined)
    setLoading(false)
  }, [])

  return {
    ...form,
    TypedController,
    isDisabled,
    onInvalid,
    onValid,
    loading,
    result,
    error,
    refresh
  }
}
