import { MockedResponse } from '@apollo/client/testing'
import { CurrentUserDocument, CurrentUserQuery, UserRole } from '@app/logic'

export const isSignedIn: MockedResponse<CurrentUserQuery> = {
  request: {
    query: CurrentUserDocument
  },
  result: {
    data: {
      currentUser: {
        id: 'user-id',
        name: { first: 'Test', last: 'User' },
        roles: [UserRole.USER]
      }
    }
  }
}

export const isNotSignedIn: MockedResponse<CurrentUserQuery> = {
  request: {
    query: CurrentUserDocument
  },
  result: {
    data: {
      currentUser: null
    }
  }
}

export const failure: MockedResponse<CurrentUserQuery> = {
  request: {
    query: CurrentUserDocument
  },
  error: new Error('CurrentUserQuery')
}
