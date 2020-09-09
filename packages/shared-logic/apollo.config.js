/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require('dotenv')
const { join } = require('path')

const env = join(__dirname, '../server/.env')
const { error } = config({ path: env })
if (error) throw error

const key = process.env.APOLLO_KEY
const port = process.env.SERVER_PORT
const graphqlPath = process.env.GRAPHQL_PATH || '/graphql'
const endpointUrl = `http://localhost:${port}${graphqlPath}`
const localSchema = join(__dirname, 'schema.graphql')
const apolloConfig = {
  client: {
    service: key
      ? 'randb-manager'
      : {
        name: 'randb-manager',
        url: endpointUrl,
        skipSSLValidation: true,
        localSchemaFile: localSchema
      },
    includes: ['**/graphql/**/*.ts'],
    excludes: ['**/lib/**/*.js', '**/graphql/**/*.tsx', '**/__tests__/**']
  }
}

console.debug(
  'apollo@server',
  JSON.stringify(
    {
      endpointUrl,
      localSchema,
      apolloConfig
    },
    null,
    2
  )
)

module.exports = apolloConfig
