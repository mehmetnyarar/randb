import { ModelType } from '@typegoose/typegoose/lib/types'
import { CreateQuery } from 'mongoose'
import { ClassType, FieldResolver, Resolver, Root } from 'type-graphql'
import { Repository } from '~/db'
import { Entity, User, UserModel } from '~/models'

/**
 * Creates an entity resolver.
 * @param Type Type.
 * @param Model Model.
 * @param [defaults] Default values.
 */
export function createEntityResolver<T extends Entity> (
  Type: ClassType<T>,
  Model: ModelType<T>,
  defaults?: CreateQuery<T>
) {
  @Resolver(Type, { isAbstract: true })
  abstract class EntityResolver {
    protected repo: Repository<T>

    constructor (repo?: Repository<T>) {
      this.repo = repo || new Repository<T>(Model, defaults)
    }

    @FieldResolver(() => User)
    async createdBy (@Root() entity: Entity) {
      return entity.createdBy && UserModel.findById(entity.createdBy)
    }

    @FieldResolver(() => User)
    async updatedBy (@Root() entity: Entity) {
      return entity.updatedBy && UserModel.findById(entity.updatedBy)
    }
  }

  return EntityResolver
}
