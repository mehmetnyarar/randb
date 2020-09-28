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

// #endregion
