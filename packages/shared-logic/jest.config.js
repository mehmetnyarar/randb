module.exports = {
  projects: [
    {
      displayName: 'logic:test',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['**/__tests__/**/+(*.)+(spec|test).+(js|ts)?(x)'],
      moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
        '^test/(.*)$': '<rootDir>/test/$1'
      },
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts']
    },
    {
      displayName: 'logic:lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/**/*.{js,jsx,ts,tsx}'],
      testPathIgnorePatterns: [
        '<rootDir>/coverage',
        '<rootDir>/lib',
        '<rootDir>/src/config/env/env.ts'
      ]
    }
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/const.ts',
    '!<rootDir>/src/**/context.ts',
    '!<rootDir>/src/config/env/env.ts',
    '!<rootDir>/src/config/env/env.config.ts',
    '!<rootDir>/src/graphql/graphql.tsx',
    '!<rootDir>/src/graphql/documents/**/*.ts',
    '!<rootDir>/src/form/yup.ts'
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
