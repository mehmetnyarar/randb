module.exports = {
  projects: [
    {
      displayName: 'ui:test',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['**/__tests__/**/+(*.)+(spec|test).+(js|ts)?(x)'],
      moduleNameMapper: { '^~/(.*)$': '<rootDir>/src/$1' },
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts']
    },
    {
      displayName: 'ui:lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/**/*.{js,jsx,ts,tsx}'],
      testPathIgnorePatterns: ['<rootDir>/coverage', '<rootDir>/lib']
    }
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/const.ts',
    '!<rootDir>/src/**/context.ts',
    '!<rootDir>/src/theme/palette/*.ts'
  ],
  coverageThreshold: {
    global: {
      statements: 25,
      branches: 25,
      functions: 25,
      lines: 25
    }
  }
}
