import { Field, Int, ObjectType } from 'type-graphql'
import { LogLevel } from '~/logger'
import { EntityType, EventType, NetworkType } from '~/models'

/**
 * Network log.
 */
@ObjectType()
export class NetworkLog {
  @Field()
  date!: Date

  @Field(() => String)
  level!: LogLevel

  @Field(() => EventType)
  event!: EventType

  @Field(() => NetworkType, { nullable: true })
  network?: NetworkType

  @Field(() => EntityType, { nullable: true })
  entity?: EntityType

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  id?: string

  @Field(() => EntityType, { nullable: true })
  targetEntity?: EntityType

  @Field({ nullable: true })
  targetName?: string

  @Field({ nullable: true })
  targetId?: string

  @Field(() => Int, { nullable: true })
  index?: number

  @Field({ nullable: true })
  missing?: string

  @Field({ nullable: true })
  invalid?: string
}

/**
 * NE report.
 */
@ObjectType()
export class NetworkElementReport {
  @Field(() => Int, { nullable: true })
  bsc?: number

  @Field(() => Int, { nullable: true })
  rnc?: number

  @Field(() => Int, { nullable: true })
  tac?: number

  @Field(() => Int, { nullable: true })
  lac?: number

  @Field(() => Int, { nullable: true })
  site?: number

  @Field(() => Int, { nullable: true })
  cell?: number

  @Field(() => Int, { nullable: true })
  antenna?: number
}

/**
 * Network import report.
 */
@ObjectType()
export class NetworkImportReport {
  @Field(() => [NetworkLog])
  logs!: NetworkLog[]

  @Field(() => NetworkElementReport, { nullable: true })
  created?: NetworkElementReport

  @Field(() => NetworkElementReport, { nullable: true })
  updated?: NetworkElementReport

  @Field(() => NetworkElementReport, { nullable: true })
  deleted?: NetworkElementReport
}
