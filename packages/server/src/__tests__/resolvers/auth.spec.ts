import { DocumentType } from '@typegoose/typegoose'
import { hash } from 'bcrypt'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Mongoose, Types } from 'mongoose'
import { connect } from '~/db'
import { GraphQLContext } from '~/graphql'
import {
  DEFAULT_PHONE_NUMBER,
  DEFAULT_USER,
  RequestOrigin,
  User,
  UserModel,
  UserRole
} from '~/models'
import { CurrentUser, SigninUserInput } from '~/modules'
import { AuthResolver } from '~/resolvers/auth'

// #region Setup

let server: MongoMemoryServer
let mongoose: Mongoose
let user: DocumentType<User>

const context: GraphQLContext = {
  req: {} as any,
  res: {
    cookie: () => {
      //
    },
    clearCookie: () => {
      //
    }
  } as any,
  auth: undefined,
  currentUser: undefined
}

jest.spyOn(context.res, 'cookie')
jest.spyOn(context.res, 'clearCookie')

const resolver = new AuthResolver()

beforeAll(async () => {
  server = new MongoMemoryServer()
  mongoose = await connect(await server.getUri())

  user = await UserModel.create({
    ...DEFAULT_USER,
    name: { first: 'Test', last: 'User' },
    email: 'test.user@myapp.com',
    phone: { cc: '1', dc: '111', sn: '1111111' },
    roles: [UserRole.USER],
    password: await hash('123456', 10)
  })
})

afterAll(async () => {
  await mongoose.disconnect()
  await server.stop()
  jest.resetAllMocks()
})

// #endregion

describe('resolver/auth', () => {
  describe('currentUser', () => {
    it('should return null (no user)', async () => {
      const result = await resolver.currentUser(context)
      expect(result).toBeUndefined()
    })

    it('should return the current user', async () => {
      const currentUser = new CurrentUser({ id: user.id, roles: user.roles })
      const ctx: GraphQLContext = { ...context, currentUser }
      const result = await resolver.currentUser(ctx)
      expect(result).toEqual(currentUser)
    })
  })

  describe('signinUser', () => {
    it('should throw an error (user not found)', async () => {
      const input: SigninUserInput = {
        email: '',
        phone: DEFAULT_PHONE_NUMBER,
        password: ''
      }

      await expect(resolver.signinUser(input, context)).rejects.toThrow()
    })

    it('should throw an error (wrong password)', async () => {
      const input: SigninUserInput = {
        email: user.email,
        phone: DEFAULT_PHONE_NUMBER,
        password: '123'
      }

      await expect(resolver.signinUser(input, context)).rejects.toThrow()

      const updatedUser = await UserModel.findById(user.id)
      expect(updatedUser?.signinFailures).toBe(1)
    })

    it('should signin the user', async () => {
      const input: SigninUserInput = {
        email: '',
        phone: user.phone,
        password: '123456',
        origin: RequestOrigin.WEB
      }

      const result = await resolver.signinUser(input, context)
      expect(result.id).toBe(user.id)
      expect(result.roles).toEqual(Array.from([...user.roles]))
      expect(result.accessToken).toBeTruthy()
      expect(result.refreshToken).toBeTruthy()
      expect(context.res.cookie).toHaveBeenCalledTimes(2)

      const updatedUser = await UserModel.findById(user.id)
      expect(updatedUser?.auth).toBe(1)
      expect(updatedUser?.signinFailures).toBe(0)
      expect(updatedUser?.resetToken).toBeUndefined()
    })

    test.todo('Create a test to fail to signin more than 3 times')
  })

  describe('signoutUser', () => {
    it('should return false (no user)', async () => {
      const result = await resolver.signoutUser({}, context)
      expect(result).toBeFalsy()
    })

    it('should return false (user not found)', async () => {
      const currentUser = new CurrentUser({
        id: Types.ObjectId().toHexString(),
        roles: []
      })
      const ctx: GraphQLContext = { ...context, currentUser }
      const result = await resolver.signoutUser({}, ctx)
      expect(result).toBeFalsy()
    })

    it('should return true', async () => {
      const currentUser = new CurrentUser({ id: user.id, roles: user.roles })
      const ctx: GraphQLContext = { ...context, currentUser }
      const result = await resolver.signoutUser(
        { origin: RequestOrigin.WEB },
        ctx
      )
      expect(result).toBeTruthy()
      expect(ctx.res.clearCookie).toHaveBeenCalledTimes(2)

      const updatedUser = await UserModel.findById(user.id)
      expect(updatedUser?.auth).toBe(2)
    })
  })
})
