import { MockedResponse } from '@apollo/client/testing'
import { WelcomeDocument, WelcomeQuery } from '@app/logic'

export const success: MockedResponse<WelcomeQuery> = {
  request: {
    query: WelcomeDocument
  },
  result: {
    data: {
      welcome: 'Welcome to the GraphQL!'
    }
  }
}

export const failure: MockedResponse<WelcomeQuery> = {
  request: {
    query: WelcomeDocument
  },
  error: new Error('WelcomeQuery')
}
