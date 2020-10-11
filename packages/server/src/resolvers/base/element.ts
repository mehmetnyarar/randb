import { ModelType } from '@typegoose/typegoose/lib/types'
import { CreateQuery, Types } from 'mongoose'
import { ClassType, FieldResolver, Resolver, Root } from 'type-graphql'
import { ElementType, NetworkElement, NetworkType } from '~/models'
import { createEntityResolver } from './entity'

const PARENT = [ElementType.BSC, ElementType.RNC, ElementType.TAC]

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
      if (!entity.children || !entity.children.length) return []

      if (PARENT.includes(entity.type)) {
        // For parent NE queries (BSC, RNC, TAC), sites should have children
        // with the appropriate network type
        network = getNetwork(entity.type)
      } else if (entity.type === ElementType.SITE) {
        // Site should have all the children available if the network is not set
        if (network) {
          return ChildrenModel.find({
            _id: { $in: entity.children as Types.ObjectId[] },
            network
          } as any)
        }
      }

      return ChildrenModel.find({
        _id: { $in: entity.children as Types.ObjectId[] }
      } as any)
    }
  }

  return NetworkElementResolver
}
