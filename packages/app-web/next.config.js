// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['@app/logic', '@app/ui'])

module.exports = withTM({
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Will make webpack look for these modules in parent directories
      '@app/logic': require.resolve('@app/logic'),
      '@app/ui': require.resolve('@app/ui')
    }

    return config
  }
})
