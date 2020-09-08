import { Index } from '@typegoose/typegoose'
import { ObjectType } from 'type-graphql'
import { EntityModel } from '../options'
import { Parent } from '../parent'

/**
 * TAC.
 */
@ObjectType()
@EntityModel('tacs')
@Index({ location: '2dsphere' })
export class Tac extends Parent {}
