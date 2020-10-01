import { MockedResponse } from '@apollo/client/testing'
import {
  RequestOrigin,
  SigninMethod,
  SigninUserDocument,
  SigninUserInput,
  SigninUserMutation,
  UserRole
} from '@app/logic'

export const successInput: SigninUserInput = {
  method: SigninMethod.USERNAME,
  username: 'test-user',
  email: '',
  phone: { cc: '', dc: '', sn: '' },
  password: '123456',
  origin: RequestOrigin.WEB
}

export const success: MockedResponse<SigninUserMutation> = {
  request: {
    query: SigninUserDocument,
    variables: {
      data: successInput
    }
  },
  result: {
    data: {
      signinUser: {
        id: 'user-id',
        name: { first: 'Test', last: 'User' },
        roles: [UserRole.USER],
        accessToken: {
          name: 'access',
          value: 'access-token',
          expires: new Date()
        },
        refreshToken: {
          name: 'refresh',
          value: 'refresh-token',
          expires: new Date()
        }
      }
    }
  }
}

export const failureInput: SigninUserInput = {
  method: SigninMethod.USERNAME,
  username: 'no-user',
  email: '',
  phone: { cc: '', dc: '', sn: '' },
  password: '123456',
  origin: RequestOrigin.WEB
}

export const failure: MockedResponse<SigninUserMutation> = {
  request: {
    query: SigninUserDocument,
    variables: {
      data: failureInput
    }
  },
  error: new Error('SigninUserMutation')
}
