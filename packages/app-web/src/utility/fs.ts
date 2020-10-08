import { FileType, getFileUrl } from '@app/logic'
import { SERVER_URL } from '~/config'

/**
 * Returns the full URL of a file.
 * @param file File.
 * @returns URL.
 */
export const getUrl = (file: FileType) => getFileUrl(file, SERVER_URL)
