import { ConfigContext, ExpoConfig } from '@expo/config'
import 'dotenv/config'

/**
 * Expo configuration.
 * @see https://docs.expo.io/versions/latest/config/app
 * @see https://docs.expo.io/guides/environment-variables/#using-a-dotenv-file
 */
export default ({ config }: ConfigContext) => {
  const appConfig: ExpoConfig = {
    ...config,
    name: config.name || 'MyApp',
    slug: config.slug || 'myapp',
    extra: {
      GRAPHQL_API_URL:
        process.env.GQL_API_URL || 'http://localhost:4000/graphql',
      GRAPHQL_SUBSCRIPTIONS_URL:
        process.env.GQL_SUBSCRIPTIONS_URL || 'ws://localhost:4000/graphql'
    }
  }

  return appConfig
}
