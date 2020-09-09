/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path')
const { config } = require('dotenv')

const env = join(__dirname, '.env')
const { error } = config({ path: env })
if (error) throw error

const port = process.env.SERVER_PORT
const graphqlPath = process.env.GRAPHQL_PATH || '/graphql'
const endpointUrl = `http://localhost:${port}${graphqlPath}`
const localSchema = join(__dirname, 'schema.graphql')
const apolloConfig = {
  service: {
    endpoint: {
      url: endpointUrl,
      skipSSLValidation: true
    },
    localSchemaFile: localSchema
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

// Apollo commands
// apollo service:push
// apollo service:check
module.exports = apolloConfig
