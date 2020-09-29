module.exports = {
  projects: [
    {
      displayName: 'web:test',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['**/__tests__/**/+(*.)+(spec|test).+(js|ts)?(x)'],
      moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
        '^test/(.*)$': '<rootDir>/test/$1'
      },
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
      globals: {
        'ts-jest': {
          tsConfig: {
            jsx: 'react'
          }
        }
      }
    },
    {
      displayName: 'web:lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/**/*.{js,jsx,ts,tsx}'],
      testPathIgnorePatterns: [
        '<rootDir>/.next',
        '<rootDir>/coverage',
        '<rootDir>/dist'
      ]
    }
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/pages/_app.tsx',
    '!<rootDir>/src/pages/_document.tsx',
    '!<rootDir>/src/pages/_error.tsx',
    '!<rootDir>/src/apollo.ts',
    '!<rootDir>/src/config.ts',
    '!<rootDir>/src/i18n.ts'
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
