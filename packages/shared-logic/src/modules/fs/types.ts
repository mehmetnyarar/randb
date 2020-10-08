import { File as GraphQLFile } from '../../graphql'

export { GraphQLFile }

export type FileModel = Partial<GraphQLFile>

export type FileType = string | FileModel | File | Blob | null | undefined

export interface FileUploadSize {
  bytes: number
  mb: number
}

export interface FileUploadType {
  id: string
  mime: string[]
  extensions: string[]
}

export interface FileUploadLimit {
  size: FileUploadSize
  types: FileUploadType[]
}
