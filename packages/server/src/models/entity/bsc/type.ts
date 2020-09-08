import { Index } from '@typegoose/typegoose'
import { ObjectType } from 'type-graphql'
import { EntityModel } from '../options'
import { Parent } from '../parent'

/**
 * BSC.
 */
@ObjectType()
@EntityModel('bscs')
@Index({ location: '2dsphere' })
export class Bsc extends Parent {}
