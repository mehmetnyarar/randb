import { DocumentType } from '@typegoose/typegoose'
import { times } from 'lodash'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Mongoose } from 'mongoose'
import { connect } from '~/db'
import { DEFAULT_USER, User, UserModel, UserRole } from '~/models'
import { getPages, paginate } from '~/modules/pagination'

// #region Setup

let server: MongoMemoryServer
let mongoose: Mongoose
let users: DocumentType<User>[] = []

beforeAll(async () => {
  server = new MongoMemoryServer()
  mongoose = await connect(await server.getUri())

  // Create initial records for queries
  users = await Promise.all(
    times(17, async n =>
      UserModel.create({
        ...DEFAULT_USER,
        username: `test-user-${n}`,
        name: { first: 'Test', last: `User${n}` },
        roles: [UserRole.USER]
      })
    )
  )
})

afterAll(async () => {
  await mongoose.disconnect()
  await server.stop()
})

// #endregion

describe('modules/pagination', () => {
  it('should calculate the number of pages', () => {
    expect(getPages(25, 10)).toBe(3)
    expect(getPages(25, 5)).toBe(5)
  })

  it('should paginate data', () => {
    let result = paginate(users)
    expect(result.total).toBe(17)
    expect(result.edges).toHaveLength(10)
    expect(result.pages).toBe(2)
    expect(result.pageInfo.hasNextPage).toBeTruthy()
    expect(result.pageInfo.hasPreviousPage).toBeFalsy()
    expect(result.pageInfo.currentPage).toBe(1)

    const after = users[9].id
    result = paginate(users, { after })
    expect(result.total).toBe(17)
    expect(result.edges).toHaveLength(7)
    expect(result.pages).toBe(2)
    expect(result.pageInfo.hasNextPage).toBeFalsy()
    expect(result.pageInfo.hasPreviousPage).toBeTruthy()
    expect(result.pageInfo.currentPage).toBe(2)

    result = paginate(users, { first: 5 })
    expect(result.total).toBe(17)
    expect(result.edges).toHaveLength(5)
    expect(result.pages).toBe(4)
    expect(result.pageInfo.hasNextPage).toBeTruthy()
    expect(result.pageInfo.hasPreviousPage).toBeFalsy()
    expect(result.pageInfo.currentPage).toBe(1)
  })
})
