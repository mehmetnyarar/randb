import { GraphQLUpload as ApolloGraphQLUpload } from 'apollo-server-express'
import { GraphQLScalarType } from 'graphql'
import { Field, InputType } from 'type-graphql'
import { Promisable } from '~/types'
import { AnalyticsInput } from '../analytics'
import { FileCategory } from './enum'
import { Upload } from './types'

/**
 * File upload.
 */
export const FileUpload = ApolloGraphQLUpload as GraphQLScalarType

/**
 * Options to create a new file.
 */
@InputType()
export class FileOptions {
  /**
   * File category.
   */
  @Field(() => FileCategory, { nullable: true })
  category?: FileCategory

  /**
   * Directory (relative to the uploads directory).
   * Default is "temp".
   */
  @Field({ nullable: true })
  directory?: string
}

/**
 * Input for uploading a file.
 */
@InputType()
export class FileInput extends AnalyticsInput {
  /**
   * URL.
   */
  url?: string

  /**
   * Upload.
   */
  @Field(() => FileUpload, { nullable: true })
  upload?: Promisable<Upload>
}
