import { Index } from '@typegoose/typegoose'
import { ObjectType } from 'type-graphql'
import { EntityModel } from '../options'
import { Parent } from '../parent'

/**
 * LAC.
 */
@ObjectType()
@EntityModel('lacs')
@Index({ location: '2dsphere' })
export class Lac extends Parent {}
