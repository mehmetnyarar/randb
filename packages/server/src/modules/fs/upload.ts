import { get } from 'lodash'
import { File, FileInput, FileOptions } from '~/models'
import { Promisable } from '~/types'
import { deleteFile, fromPath, fromUpload } from './file'

/**
 * Determines whether the value is a file upload or not.
 * @param [value] Value.
 * @returns True if the condition is met.
 */
export function isFileUpload<T> (value?: Promisable<T>) {
  if (!value) return false
  return typeof get(value, 'then') === 'function'
}

/**
 * Creates a new file and replaces it with the existing one.
 * @param [input] File input.
 * @param [options] Options.
 * @param [current] Current value.
 * @returns File.
 */
export const getFile = async (
  input: FileInput = {},
  options: FileOptions = {},
  current?: File
) => {
  let file = current
  let deleteCurrent = false

  const { url, upload } = input

  // Check whether the user has deleted the file
  if (!url && !upload) {
    file = undefined
    deleteCurrent = true
  }

  if (url) {
    // TODO Support saving files from URLs
    file = undefined
    deleteCurrent = true
  }

  if (upload) {
    // Regular file upload
    if (isFileUpload(upload)) {
      const { createReadStream, ...rest } = await upload
      const stream = createReadStream()
      file = await fromUpload({ stream, ...rest }, options)
      deleteCurrent = true
    }

    // Mobile upload
    const path = get(upload, 'path')
    if (path && (!current || current.path !== path)) {
      file = await fromPath(path)
      deleteCurrent = true
    }
  }

  if (deleteCurrent) {
    await deleteFile(current?.path)
  }

  return file
}
