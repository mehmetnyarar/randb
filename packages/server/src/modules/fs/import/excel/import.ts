import xlsx from 'xlsx'
import { Logger } from '~/logger'

const logger = Logger.create({
  src: 'modules/fs/import/excel',
  file: 'info'
})

/**
 * Imports an Excel sheet.
 * @param path Workbook path.
 * @param [name] Sheet name.
 * @returns Items.
 */
export function sheet<T = any> (path: string, name?: string): T[] {
  logger.info(`Workbook: ${path}`)
  const book = xlsx.readFile(path)

  const sheetName = name || book.SheetNames[0]
  const sheet = book.Sheets[sheetName]
  logger.info(`Worksheet: ${sheetName}`)

  const items = xlsx.utils.sheet_to_json(sheet) as T[]
  logger.info(`Number of items: ${items.length}`)

  return items
}
