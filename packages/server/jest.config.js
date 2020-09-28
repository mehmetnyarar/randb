module.exports = {
  projects: [
    {
      displayName: 'server:test',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/**/+(*.)+(spec|test).+(js|ts)?(x)'],
      moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
        '^test/(.*)$': '<rootDir>/test/$1'
      },
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts']
    },
    {
      displayName: 'server:lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/**/*.{js,ts}'],
      testPathIgnorePatterns: ['<rootDir>/coverage']
    }
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/const.ts',
    '!<rootDir>/src/**/enum.ts',
    '!<rootDir>/src/**/error.ts',
    '!<rootDir>/src/**/input.ts',
    '!<rootDir>/src/**/model.ts',
    '!<rootDir>/src/**/type.ts',
    '!<rootDir>/src/**/options.ts',
    '!<rootDir>/src/db/tasks/*.ts'
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
    }
  }
}
