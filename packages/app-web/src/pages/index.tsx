import { useWelcomeQuery } from '@app/logic'
import React from 'react'
import { initializeApollo } from '~/apollo'
import { Layout } from '~/components/layout'

/**
 * Home screen.
 */
const HomeScreen: React.FC = () => {
  const { loading, error, data } = useWelcomeQuery()

  return (
    <Layout title='Home'>
      <main role='main'>
        <p>Welcome to the web application!</p>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data?.welcome && <p>{data.welcome}</p>}
      </main>

      <style jsx>
        {`
          main {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </Layout>
  )
}

/**
 * Static props.
 */
export async function getStaticProps () {
  const apolloClient = initializeApollo()

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  }
}

export default HomeScreen
