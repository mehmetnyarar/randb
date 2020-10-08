import { Stream } from 'stream'

/**
 * File upload.
 */
export interface Upload {
  filename: string
  mimetype: string
  encoding: string
  createReadStream: () => Stream
}

/**
 * Uploaded file.
 */
export interface UploadedFile {
  filename: string
  mimetype: string
  encoding: string
  stream: any // ReadStream
}
