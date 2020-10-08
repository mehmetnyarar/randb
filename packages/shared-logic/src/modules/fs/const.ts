import { FileUploadLimit } from './types'
import { getFileUploadSize } from './utility'

/**
 * Upload limits for network imports.
 */
export const NETWORK_UPLOAD_LIMIT: FileUploadLimit = {
  size: getFileUploadSize(50),
  types: [
    {
      id: 'excel',
      mime: ['application/vnd.ms-excel'],
      extensions: ['.xls']
    },
    {
      id: 'excel.open',
      mime: [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ],
      extensions: ['.xlsx']
    }
  ]
}
