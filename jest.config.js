module.exports = {
  displayName: 'root:lint',
  runner: 'jest-runner-eslint',
  testMatch: ['<rootDir>/*.{js,ts}'],
  watchPlugins: ['jest-runner-eslint/watch-fix']
}
