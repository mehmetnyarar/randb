import { createApolloServer, createGraphQLSchema } from '~/graphql'

describe('graphql/server', () => {
  it('should create an Apollo server', async () => {
    const schema = await createGraphQLSchema()
    const result = await createApolloServer(schema)
    expect(result).toBeTruthy()
  })
})
