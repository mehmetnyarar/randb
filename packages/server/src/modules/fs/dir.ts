import { access, ensureDir } from 'fs-extra'
import { join } from 'path'
import { LOGS_DIR, UPLOADS_DIR } from '~/config'
import { Logger } from '~/logger'

const logger = Logger.create({
  src: 'fs/dir',
  file: 'info'
})

/**
 * Checks whether a path exists or not.
 * @param path Path.
 * @returns True if exists.
 */
export const exists = async (path: string) =>
  new Promise(resolve => {
    access(path, error => {
      if (error) resolve(false)
      resolve(true)
    })
  })

/**
 * Ensures that the mandatory directories exist.
 */
export const ensureDirs = async () => {
  await ensureDir(LOGS_DIR)
  await ensureDir(UPLOADS_DIR)
}

/**
 * Ensures that a path exists in the uploads directory.
 * @param [path="temp"] Path.
 * @returns Full path.
 */
export const ensureUploadDir = async (path = 'temp') => {
  const dir = join(UPLOADS_DIR, path)

  try {
    await ensureDir(dir)
    return dir
  } catch (error) {
    logger.error('ensureUploadDir', error)
    return undefined
  }
}
