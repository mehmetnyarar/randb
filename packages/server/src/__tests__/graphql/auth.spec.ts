import { Types } from 'mongoose'
import { ResolverData } from 'type-graphql'
import { GraphQLContext } from '~/graphql'
import { authChecker, getIgnoredRoles } from '~/graphql/auth'
import { Language, UserRole } from '~/models'
import { CurrentUser } from '~/modules'

// #region Setup

const data: ResolverData<GraphQLContext> = {
  root: null,
  args: {},
  context: {
    req: {} as never,
    res: {} as never,
    t: jest.fn(),
    lang: Language.en,
    auth: false,
    currentUser: undefined
  },
  info: {} as never
}

const withAuth = {
  ...data,
  context: {
    ...data.context,
    auth: [UserRole.USER]
  }
}

const withUser = {
  ...data,
  context: {
    ...data.context,
    auth: true,
    currentUser: new CurrentUser({
      id: Types.ObjectId().toHexString(),
      name: { first: 'Test', last: 'User' },
      roles: [UserRole.MANAGER]
    })
  }
}

// #endregion

describe('graphql/auth', () => {
  describe('getIgnoredRoles', () => {
    it('should return an empty array', () => {
      expect(getIgnoredRoles(true)).toHaveLength(0)
    })

    it('should return user roles to ignore', () => {
      expect(getIgnoredRoles(['USER', 'SUBSCRIBER', 'INVALID_ROLE'])).toEqual([
        UserRole.ADMIN,
        UserRole.MANAGER
      ])
    })
  })

  describe('authChecker', () => {
    it('should allow the operation (disabled)', async () => {
      const result = await authChecker(data, [UserRole.USER])
      expect(result).toBeTruthy()
    })

    it('should allow the operation (role ignored)', async () => {
      const result = await authChecker(withAuth, [UserRole.ADMIN])
      expect(result).toBeTruthy()
    })

    it('should block the operation (no user)', async () => {
      const result = await authChecker(withAuth, [UserRole.USER])
      expect(result).toBeFalsy()
    })

    it('should block the operation (unauthorized user)', async () => {
      const result = await authChecker(withUser, [UserRole.ADMIN])
      expect(result).toBeFalsy()
    })

    it('should allow the operation (no roles)', async () => {
      const result = await authChecker(withUser, [])
      expect(result).toBeTruthy()
    })

    it('should allow the operation (authorized user)', async () => {
      const result = await authChecker(withUser, [UserRole.MANAGER])
      expect(result).toBeTruthy()
    })
  })
})
