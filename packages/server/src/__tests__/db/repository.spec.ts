import { DocumentType } from '@typegoose/typegoose'
import { times } from 'lodash'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Mongoose } from 'mongoose'
import { connect } from '~/db/connect'
import { Repository } from '~/db/repository'
import {
  DEFAULT_USER,
  LogModel,
  RequestOrigin,
  User,
  UserModel,
  UserRole
} from '~/models'

// #region Setup

const spy = jest.spyOn(LogModel, 'create')

let server: MongoMemoryServer
let mongoose: Mongoose
let users: DocumentType<User>[] = []

const repo = new Repository<User>(UserModel, DEFAULT_USER)

beforeAll(async () => {
  server = new MongoMemoryServer()
  mongoose = await connect(await server.getUri())

  // Create initial records for queries
  users = await Promise.all(
    times(17, async n =>
      UserModel.create({
        ...DEFAULT_USER,
        username: `initial-user-${n}`,
        name: { first: 'Initial', last: `User${n}` },
        roles: [UserRole.USER]
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

describe('db/repository', () => {
  describe('create', () => {
    it('should create an entity', async () => {
      const entity = await repo.create({
        username: 'test-user-1',
        name: { first: 'Test', last: 'User1' },
        roles: [UserRole.ADMIN]
      })

      expect(entity.name.last).toBe('User1')
      expect(Array.from(entity.roles)).toEqual([UserRole.ADMIN])
      expect(entity.logs).toHaveLength(1)
    })

    test.todo('Create a test to throw an error')
  })

  describe('update', () => {
    it('should update an entity', async () => {
      const entity = await repo.update(users[0], {
        roles: [UserRole.MANAGER]
      })

      expect(Array.from(entity.roles)).toEqual([UserRole.MANAGER])
      expect(entity.logs).toHaveLength(1)
    })

    it('should update an entity by id', async () => {
      const entity = await repo.updateById(users[1].id, {
        roles: [UserRole.MANAGER]
      })

      expect(Array.from(entity.roles)).toEqual([UserRole.MANAGER])
      expect(entity.logs).toHaveLength(1)
    })

    test.todo('Create a test for detecting changes')
    test.todo('Create a test to throw an error')
  })

  describe('upsert', () => {
    it('shoud upsert an entity (create)', async () => {
      const entity = await repo.upsert(null, {
        username: 'test-user-2',
        name: { first: 'Test', last: 'User2' },
        roles: [UserRole.ADMIN]
      })

      expect(entity.name.last).toBe('User2')
      expect(Array.from(entity.roles)).toEqual([UserRole.ADMIN])
      expect(entity.logs).toHaveLength(1)
    })

    it('shoud upsert an entity (update)', async () => {
      const entity = await repo.upsert(users[2], {
        roles: [UserRole.MANAGER]
      })

      expect(Array.from(entity.roles)).toEqual([UserRole.MANAGER])
      expect(entity.logs).toHaveLength(1)
    })

    it('shoud upsert an entity by id (create)', async () => {
      const entity = await repo.upsertById(null, {
        username: 'test-user-3',
        name: { first: 'Test', last: 'User3' },
        roles: [UserRole.ADMIN]
      })

      expect(entity.name.last).toBe('User3')
      expect(Array.from(entity.roles)).toEqual([UserRole.ADMIN])
      expect(entity.logs).toHaveLength(1)
    })

    it('shoud upsert an entity by id (update)', async () => {
      const entity = await repo.upsertById(users[3].id, {
        roles: [UserRole.MANAGER]
      })

      expect(Array.from(entity.roles)).toEqual([UserRole.MANAGER])
      expect(entity.logs).toHaveLength(1)
    })
  })

  describe('delete', () => {
    it('should delete an entity', async () => {
      const entity = await repo.delete(users[6])
      expect(entity).toBeTruthy()
    })

    it('should delete an entity by id', async () => {
      const entity = await repo.deleteById(users[7].id)
      expect(entity).toBeTruthy()
    })

    test.todo('Create a test to throw an error')
  })

  describe('search', () => {
    describe('find', () => {
      it('should find entities (default query)', async () => {
        const result = await repo.find()
        expect(result).toHaveLength(18)
        expect(LogModel.create).not.toHaveBeenCalled()
      })

      it('should find entities (custom query)', async () => {
        const result = await repo.find({ 'name.first': 'Initial' })
        expect(result).toHaveLength(15)
        expect(LogModel.create).not.toHaveBeenCalled()
      })

      it('should log the query', async () => {
        await repo.find({}, { origin: RequestOrigin.WEB })
        expect(LogModel.create).toHaveBeenCalled()
      })
    })

    describe('findOne', () => {
      it('should find entity (default query)', async () => {
        const result = await repo.findOne()
        expect(result).toBeFalsy()
        expect(LogModel.create).not.toHaveBeenCalled()
      })

      it('should find entity (custom query)', async () => {
        const result = await repo.findOne({
          name: { first: 'Test', last: 'User1' }
        })
        expect(result).toBeTruthy()
        expect(LogModel.create).not.toHaveBeenCalled()
      })

      it('should log the query', async () => {
        await repo.findOne(
          { name: { first: 'Test', last: 'User1' } },
          { origin: RequestOrigin.WEB }
        )
        expect(LogModel.create).toHaveBeenCalled()
      })
    })

    describe('findById', () => {
      it('should find entity by id (no id)', async () => {
        const entity = await repo.findById()
        expect(entity).toBeFalsy()
        expect(LogModel.create).not.toHaveBeenCalled()
      })

      it('should find entity by id', async () => {
        const entity = await repo.findById(users[0].id)
        expect(entity?.id).toBe(users[0].id)
        expect(LogModel.create).not.toHaveBeenCalled()
      })

      it('should log the query', async () => {
        await repo.findById(users[0].id, { origin: RequestOrigin.WEB })
        expect(LogModel.create).toHaveBeenCalled()
      })
    })
  })
})
