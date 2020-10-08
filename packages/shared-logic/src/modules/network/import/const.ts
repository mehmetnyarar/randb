import { Yup } from '../../../form'
import { NetworkImportInput, NetworkType } from '../../../graphql'

/**
 * Default values for network import.
 */
export const DEFAULT_NETWORK_IMPORT_VALUES: NetworkImportInput = {
  type: NetworkType.G2,
  upload: null
}

/**
 * Validation schema for network import.
 */
export const validationSchema = Yup.object<NetworkImportInput>({
  type: Yup.string().oneOf(Object.values(NetworkType)).required(),
  upload: Yup.mixed().required()
})
