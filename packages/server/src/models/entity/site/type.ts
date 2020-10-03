import { Index, Prop, Ref } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { GeoLocation, Geometry } from '~/models/embed'
import { Bsc } from '../bsc'
import { Cell } from '../cell'
import { Lac } from '../lac'
import { NetworkElement } from '../ne'
import { EntityModel } from '../options'
import { Rnc } from '../rnc'
import { Tac } from '../tac'

/**
 * Site.
 */
@ObjectType()
@EntityModel('sites')
@Index({ location: '2dsphere' })
export class Site extends NetworkElement {
  @Field(() => Bsc, { nullable: true })
  @Prop({ ref: 'Bsc' })
  bsc?: Ref<Bsc>

  @Field(() => Rnc, { nullable: true })
  @Prop({ ref: 'Rnc' })
  rnc?: Ref<Rnc>

  @Field(() => Tac, { nullable: true })
  @Prop({ ref: 'Tac' })
  tac?: Ref<Tac>

  @Field(() => Lac, { nullable: true })
  @Prop({ ref: 'Lac' })
  lac?: Ref<Lac>

  @Field(() => GeoLocation)
  @Prop({ required: true })
  location!: Geometry

  @Field(() => [Cell])
  @Prop({ ref: 'Cell', default: [] })
  children!: Ref<Cell>[]

  @Field(() => [ID])
  @Prop()
  g2!: Ref<Cell>[]

  @Field(() => [ID])
  @Prop()
  g3!: Ref<Cell>[]

  @Field(() => [ID])
  @Prop()
  g4!: Ref<Cell>[]
}
