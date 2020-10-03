import { ModelType } from '@typegoose/typegoose/lib/types'
import { CreateQuery, Types } from 'mongoose'
import { ClassType, FieldResolver, Resolver, Root } from 'type-graphql'
import { ElementType, NetworkElement, NetworkType } from '~/models'
import { createEntityResolver } from './entity'

let network: NetworkType | undefined
const getNetwork = (type: ElementType) => {
  switch (type) {
    case ElementType.BSC:
      return NetworkType.G2
    case ElementType.RNC:
      return NetworkType.G3
    case ElementType.TAC:
      return NetworkType.G4
    default:
      return network
  }
}

/**
 * Creates a network element resolver.
 * @param Type Type.
 * @param Model Model.
 * @param ChildrenType Type of children.
 * @param ChildrenModel Model of children.
 * @param [defaults] Default values.
 */
export function createNetworkElementResolver<
  T extends NetworkElement,
  C extends NetworkElement | undefined
> (
  Type: ClassType<T>,
  Model: ModelType<T>,
  ChildrenType: ClassType<C>,
  ChildrenModel: ModelType<C>,
  defaults: CreateQuery<T>
) {
  const EntityResolver = createEntityResolver<T>(Type, Model, defaults)

  @Resolver(Type, { isAbstract: true })
  abstract class NetworkElementResolver extends EntityResolver {
    @FieldResolver(() => [ChildrenType])
    async children (@Root() entity: NetworkElement) {
      if (!entity.children) return []

      network = getNetwork(entity.type)
      const useNetwork = entity.type === ElementType.SITE

      return ChildrenModel.find({
        _id: { $in: entity.children as Types.ObjectId[] },
        network: useNetwork ? network : undefined
      } as any)
    }
  }

  return NetworkElementResolver
}
