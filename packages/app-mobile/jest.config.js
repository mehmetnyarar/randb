// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  projects: [
    {
      ...tsjPreset,
      displayName: 'mobile:test',
      preset: 'jest-expo',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/**/+(*.)+(spec|test).+(js|ts)?(x)'],
      transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry|@ui-kitten/.*)'
      ],
      moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
        '^test/(.*)$': '<rootDir>/test/$1'
      },
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
      globals: {
        'ts-jest': {
          babelConfig: true,
          tsConfig: 'tsconfig.test.json'
        }
      },
      cacheDirectory: '.jest/cache'
    },
    {
      displayName: 'mobile:lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/**/*.{js,jsx,ts,tsx}'],
      testPathIgnorePatterns: [
        '<rootDir>/__generated__',
        '<rootDir>/.expo',
        '<rootDir>/coverage',
        '<rootDir>/App.tsx',
        '<rootDir>/src/index.tsx'
      ]
    }
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/index.tsx',
    '!<rootDir>/src/icons.tsx',
    '!<rootDir>/src/apollo.ts',
    '!<rootDir>/src/config.ts',
    '!<rootDir>/src/navigation/**/*.{ts,tsx}'
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
