import { Field, InputType } from 'type-graphql'
import { FileInput, NetworkType } from '~/models'

/**
 * Input for importing a network.
 */
@InputType()
export class NetworkImportInput extends FileInput {
  @Field(() => NetworkType)
  type!: NetworkType
}
