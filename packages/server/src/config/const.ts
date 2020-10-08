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

/**
 * Directory for i18n locales.
 */
export const LOCALES_DIR = join(ROOT_DIR, 'src/locales')

/**
 * Name of the directory for file uploads.
 */
export const UPLOADS_DIR_NAME = 'media'

/**
 * Directory for file uploads.
 */
export const UPLOADS_DIR = join(ROOT_DIR, UPLOADS_DIR_NAME)

// #endregion
