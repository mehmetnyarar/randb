import { MockedResponse } from '@apollo/client/testing'
import {
  RequestOrigin,
  SignoutUserDocument,
  SignoutUserInput,
  SignoutUserMutation
} from '@app/logic'

export const successInput: SignoutUserInput = {
  origin: RequestOrigin.MOBILE
}

export const success: MockedResponse<SignoutUserMutation> = {
  request: {
    query: SignoutUserDocument,
    variables: {
      data: successInput
    }
  },
  result: {
    data: {
      signoutUser: true
    }
  }
}

export const failureInput: SignoutUserInput = {
  origin: RequestOrigin.MOBILE
}

export const failure: MockedResponse<SignoutUserMutation> = {
  request: {
    query: SignoutUserDocument,
    variables: {
      data: failureInput
    }
  },
  error: new Error('SignoutUserMutation')
}
