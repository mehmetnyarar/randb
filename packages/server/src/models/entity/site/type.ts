import { Index, Prop, Ref } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { GeoLocation, Geometry } from '~/models/embed'
import { Entity } from '../base'
import { Bsc } from '../bsc'
import { Cell2G } from '../cell2g'
import { Cell3G } from '../cell3g'
import { Cell4G } from '../cell4g'
import { Lac } from '../lac'
import { EntityModel } from '../options'
import { Rnc } from '../rnc'
import { Tac } from '../tac'
import { User } from '../user'

/**
 * Site.
 */
@ObjectType()
@EntityModel('sites')
@Index({ location: '2dsphere' })
export class Site extends Entity {
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

  @Field()
  @Prop({ default: '' })
  ID!: string

  @Field()
  @Prop({ required: true, unique: true })
  name!: string

  @Field(() => GeoLocation)
  @Prop({ required: true })
  location!: Geometry

  @Field(() => [ID])
  @Prop({ ref: 'Cell2G', default: [] })
  cells2g!: Ref<Cell2G>[]

  @Field(() => [ID])
  @Prop({ ref: 'Cell3G', default: [] })
  cells3g!: Ref<Cell3G>[]

  @Field(() => [ID])
  @Prop({ ref: 'Cell4G', default: [] })
  cells4g!: Ref<Cell4G>[]

  // #region Entity

  @Field(() => User, { nullable: true })
  createdBy?: Ref<User>

  @Field(() => User, { nullable: true })
  updatedBy?: Ref<User>

  // #endregion
}
