import { Index } from '@typegoose/typegoose'
import { ObjectType } from 'type-graphql'
import { EntityModel } from '../options'
import { Parent } from '../parent'

/**
 * RNC.
 */
@ObjectType()
@EntityModel('rncs')
@Index({ location: '2dsphere' })
export class Rnc extends Parent {}
