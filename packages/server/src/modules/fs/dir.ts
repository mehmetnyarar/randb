import { access, ensureDir } from 'fs-extra'
import { LOGS_DIR } from '~/config'

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
}
