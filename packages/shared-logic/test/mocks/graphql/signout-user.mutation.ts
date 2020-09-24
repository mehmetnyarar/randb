import { MockedResponse } from '@apollo/client/testing'
import {
  SignoutUserDocument,
  SignoutUserInput,
  SignoutUserMutation
} from '~/graphql'

export const successInput: SignoutUserInput = {
  origin: undefined
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
  origin: undefined
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
