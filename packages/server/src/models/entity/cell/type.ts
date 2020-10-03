import { Prop, Ref } from '@typegoose/typegoose'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import { GeoLocation, Geometry } from '~/models/embed'
import { Antenna } from '../antenna'
import { Bsc } from '../bsc'
import { Lac } from '../lac'
import { NetworkElement } from '../ne'
import { EntityModel } from '../options'
import { Rnc } from '../rnc'
import { Site } from '../site'
import { Tac } from '../tac'
import { Scenario } from './enum'
import { Cell2G } from './g2'
import { Cell3G } from './g3'
import { Cell4G } from './g4'

/**
 * Cell.
 */
@ObjectType()
@EntityModel('cells')
export class Cell extends NetworkElement {
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

  @Field(() => Site)
  @Prop({ ref: 'Site', required: true })
  site!: Ref<Site>

  @Field(() => GeoLocation)
  @Prop({ required: true })
  location!: Geometry

  @Field()
  @Prop({ default: '' })
  sector!: string

  @Field(() => Float)
  @Prop({ default: 0 })
  height!: number

  @Field(() => Int)
  @Prop({ default: 0 })
  azimuth!: number

  @Field(() => Antenna)
  @Prop({ ref: 'Antenna' })
  antenna?: Ref<Antenna>

  @Field(() => Float)
  @Prop({ default: 0 })
  electricalTilt!: number

  @Field(() => Float)
  @Prop({ default: 0 })
  mechanicalTilt!: number

  @Field(() => Scenario)
  @Prop({ enum: Scenario, type: String })
  scenario!: Scenario

  @Field(() => Cell2G, { nullable: true })
  @Prop()
  g2?: Cell2G

  @Field(() => Cell3G, { nullable: true })
  @Prop()
  g3?: Cell3G

  @Field(() => Cell4G, { nullable: true })
  @Prop()
  g4?: Cell4G
}
