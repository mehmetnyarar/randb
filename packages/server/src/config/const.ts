import { join } from 'path'

// #region Directories

/**
 * Root directory.
 */
export const ROOT_DIR = process.cwd()

/**
 * Directory where the logs are saved.
 */
export const LOGS_DIR = join(ROOT_DIR, 'logs')

// #endregion
