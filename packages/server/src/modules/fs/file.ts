import fs from 'fs-extra'
import { toLower } from 'lodash'
import { extension, lookup } from 'mime-types'
import { basename, extname, join } from 'path'
import { ROOT_DIR, UPLOADS_DIR_NAME } from '~/config'
import { Logger } from '~/logger'
import { File, FileCategory, FileOptions, UploadedFile } from '~/models'
import { getRandomString, slice } from '~/utility'
import { ensureUploadDir } from './dir'

const logger = Logger.create({
  src: 'fs/file',
  file: 'info'
})

/**
 * Generates a random file name.
 * @returns File name (without extension).
 */
export const getRandomFileName = getRandomString(6, [
  'lower',
  'upper',
  'numeric'
])

/**
 * Creates a file name.
 * @param type MIME type.
 * @param [id] File identifier.
 * @returns File name (with extension).
 */
export const getFileName = (type: string, category?: FileCategory) => {
  const id = category ? toLower(slice(category)) : undefined
  const ext = extension(type) || ''
  const name = `${getRandomFileName()}.${ext}`

  logger.trace('fromUpload', { type, category, id, ext, name })
  return id ? `${id}-${name}` : name
}

/**
 * Creates a file.
 * @param file Uploaded file.
 * @param [options] Options.
 * @returns File.
 */
export const fromUpload = async (
  file: UploadedFile,
  options: FileOptions = {}
) => {
  const { category, directory = 'temp' } = options
  const dir = await ensureUploadDir(directory)

  logger.trace('fromUpload', { file, options, dir })
  if (!dir) return undefined

  const { stream, mimetype } = file
  const root = `${UPLOADS_DIR_NAME}/${directory}`
  const name = getFileName(mimetype, category)
  const path = `/${root}/${name}`
  const type = lookup(name) || ''
  const filepath = join(dir, name)
  logger.trace('fromUpload', { root, name, path, type, filepath })

  let size = 0
  return new Promise<File | undefined>(resolve =>
    stream
      .on('data', (chunk: any) => {
        size += chunk.length
      })
      .pipe(fs.createWriteStream(filepath))
      .on('finish', () => {
        resolve({
          name,
          path,
          size,
          type
        })
      })
      .on('error', (error: any) => {
        if ((stream as any).truncated) {
          fs.unlinkSync(filepath)
        }

        logger.error('fromUpload', { error })
        resolve(undefined)
      })
  )
}

/**
 * Creates a file from path.
 * @param path Path (relative to the root directory.)
 * @returns File.
 */
export const fromPath = async (path: string) => {
  try {
    const filepath = join(ROOT_DIR, path)
    if (!(await fs.pathExists(filepath))) {
      logger.debug('fromPath', { filepath })
      return undefined
    }

    const name = basename(filepath, extname(filepath))
    const size = (await fs.stat(filepath)).size
    const type = lookup(name) || ''

    return {
      name,
      path,
      size,
      type
    } as File
  } catch (error) {
    logger.error('fromPath', { error })
    return undefined
  }
}

/**
 * Deletes a file.
 * @param path Path (relative to uploads directory).
 * @returns True if the file doesn't exist or deleted successfully.
 */
export const deleteFile = async (path?: string) => {
  if (!path) return true

  const file = join(ROOT_DIR, path)
  if (!(await fs.pathExists(file))) {
    return true
  }

  try {
    await fs.remove(file)
    return true
  } catch (error) {
    logger.error('deleteFile', { error })
    return false
  }
}
