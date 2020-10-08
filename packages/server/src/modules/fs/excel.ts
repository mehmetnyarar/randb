import xlsx from 'xlsx'
import { Logger } from '~/logger'

const logger = Logger.create({
  src: 'fs/excel',
  file: 'info'
})

/**
 * Imports an Excel sheet.
 * @param path File path.
 * @param [name] Sheet name.
 * @returns Items.
 */
export function sheet<T = any> (path: string, name?: string) {
  logger.debug('sheet', { path, name })

  let book: xlsx.WorkBook | undefined
  try {
    book = xlsx.readFile(path)
  } catch (error) {
    logger.error('XLSX_FILE_ERROR', error)
    return 'XLSX_FILE_ERROR'
  }

  const sheetName = name || book.SheetNames[0]
  let sheet: xlsx.WorkSheet | undefined
  try {
    sheet = book.Sheets[sheetName]
  } catch (error) {
    logger.error('XLSX_SHEET_ERROR', error)
    return 'XLSX_SHEET_ERROR'
  }

  try {
    return xlsx.utils.sheet_to_json(sheet) as T[]
  } catch (error) {
    logger.error('XLSX_TO_JSON_ERROR', error)
    return 'XLSX_TO_JSON_ERROR'
  }
}
