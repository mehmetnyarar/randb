import { GraphQLContext, GraphQLContextConnection } from '~/graphql'
import { context } from '~/graphql/context'

// #region Setup

const httpContext: GraphQLContext = {
  req: {} as never,
  res: {} as never,
  auth: false,
  currentUser: undefined
}

const wsContext: GraphQLContext = {
  req: { method: 'ws' } as never,
  res: { method: 'ws' } as never,
  auth: false,
  currentUser: undefined
}

const connection: GraphQLContextConnection = {
  query: '',
  variables: {},
  operationName: '',
  context: wsContext
}

// #endregion

describe('graphql/context', () => {
  it('should create a context', async () => {
    const result = await context(httpContext)
    expect(result).toEqual(httpContext)
  })

  it('should return context from the connection', async () => {
    const result = await context({ ...httpContext, connection })
    expect(result).toEqual(wsContext)
  })
})
