import { createGraphQLSchema } from '~/graphql'

describe('graphql/schema', () => {
  it('should create a schema', async () => {
    const schema = await createGraphQLSchema()
    expect(schema).toBeTruthy()
  })
})
