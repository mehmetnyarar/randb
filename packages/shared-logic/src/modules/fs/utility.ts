import { FileType, FileUploadLimit, FileUploadSize } from './types'

/**
 * Returns the full URL of a file.
 * @param file File.
 * @param baseUrl Base URL.
 */
export const getFileUrl = (file: FileType, baseUrl: string) => {
  if (!file) return ''

  if (file instanceof File || file instanceof Blob) {
    return URL.createObjectURL(file)
  }

  if (typeof file === 'object' && file.path) return `${baseUrl}${file.path}`
  if (typeof file === 'string') return `${baseUrl}${file}`

  return ''
}

/**
 * Returns file sizes for uploads.
 * @param size Size in MB.
 * @returns File sizes.
 */
export const getFileUploadSize = (size: number): FileUploadSize => {
  return {
    bytes: size * 1024 * 1024,
    mb: size
  }
}

/**
 * Returns the file formats for upload.
 * @param [limit] Upload limit.
 * @returns File formats.
 */
export const getFileUploadFormats = (limit?: FileUploadLimit) => {
  if (!limit) return ''

  const extensions = limit.types.reduce((arr, type) => {
    return arr.concat(type.extensions)
  }, [] as string[])

  return extensions.join(', ')
}

/**
 * Returns the file mime types for upload.
 * @param [limit] Upload limit.
 * @returns File mime types.
 */
export const getFileUploadAccept = (limit?: FileUploadLimit) => {
  if (!limit) return ''

  const mimes = limit.types.reduce((arr, type) => {
    return arr.concat(type.mime)
  }, [] as string[])

  return mimes.join(', ')
}
