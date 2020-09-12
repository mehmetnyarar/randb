import { MockedResponse } from '@apollo/client/testing'
import welcome from './welcome'

export const data: MockedResponse[] = [welcome]

export const errors: MockedResponse[] = data.map(item => ({
  ...item,
  result: undefined,
  error: new Error('GraphQL error!')
}))
