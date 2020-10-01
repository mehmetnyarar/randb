import { DocumentType } from '@typegoose/typegoose'
import { times } from 'lodash'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Mongoose } from 'mongoose'
import { connect } from '~/db'
import * as typegoose from '~/graphql/middlewares/typegoose'
import { DEFAULT_USER, User, UserModel } from '~/models'

// #region Setup

const spy = jest.spyOn(typegoose, 'convertDocument')

let server: MongoMemoryServer
let mongoose: Mongoose
let users: DocumentType<User>[]

beforeAll(async () => {
  server = new MongoMemoryServer()
  mongoose = await connect(await server.getUri())

  users = await Promise.all(
    times(5, async n =>
      UserModel.create({
        ...DEFAULT_USER,
        username: `test-user-${n}`,
        name: { first: 'Test', last: `User${n}` }
      })
    )
  )
})

beforeEach(() => {
  spy.mockClear()
})

afterAll(async () => {
  await mongoose.disconnect()
  await server.stop()

  spy.mockRestore()
})

// #endregion

describe('graphql/middlewares/typegoose', () => {
  it('should convert to documents', async () => {
    const next = async () => UserModel.find({})
    const result = await typegoose.middleware({} as never, next)

    expect(result).toBeTruthy()
    expect(typegoose.convertDocument).toHaveBeenCalled()
  })

  it('should convert to document', async () => {
    const id = users[0].id
    const next = async () => UserModel.findById(id)
    const result = await typegoose.middleware({} as never, next)

    expect(result).toBeTruthy()
    expect(typegoose.convertDocument).toHaveBeenCalled()
  })
})
