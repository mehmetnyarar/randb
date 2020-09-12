import { MockedResponse } from '@apollo/client/testing'
import { WelcomeDocument, WelcomeQuery } from '@app/logic'

const data: MockedResponse<WelcomeQuery> = {
  request: {
    query: WelcomeDocument
  },
  result: {
    data: {
      welcome: 'Welcome to the GraphQL API!'
    }
  }
}

export default data
