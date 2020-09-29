# Shared Logic (@app/logic)

This is a shared library that provides application logic to the front-end applications.

## Structure

| Directory | Description                                                                      |
| --------- | -------------------------------------------------------------------------------- |
| config    | Configuration                                                                    |
| form      | Form utilities                                                                   |
| graphql   | Apollo GraphQL                                                                   |
| logger    | Logging utility                                                                  |
| models    | Types/interfaces, hooks, and other helpers & utilities                           |
| modules   | Types/interfaces, hooks, and other helpers & utilities                           |
| storage   | [Async Storage](https://react-native-community.github.io/async-storage/) helpers |

## Config

Configuration of any sort is provided via constants and environment variables that are located in the `~/config` directory.

- Check `~/config/env/env.config.ts` to see how environment variables are/should be set

## Form

Provides form helpers.

| Directory | Description                                                |
| --------- | ---------------------------------------------------------- |
| yup       | Form validation with [Yup](https://github.com/jquense/yup) |

## GraphQL

The GraphQL types are generated via [GraphQL Code Generator](https://graphql-code-generator.com/).

- All graphql documents are/should be located in the `~/graphql/documents` directory
- The output file is `~/graphql/graphql.tsx`

In order to take advantage of GraphQL code intellisense, Install [Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) extension. The project has a built-in support local schema files but [Apollo Studio](https://studio.apollographql.com/) can also be used.

## Logger

Logger is a custom console API that provides conditional logging and the capability of storing logs in various environments which is located in the `~/logger` directory.

```ts
const logger = Logger.create({
  // Origin
  src: 'my-module',
  // Save log messages to the files (my-module_<date#yyyymmdd>.log)
  // if the log level of the message is error and below
  file: 'error',
  // Print log messages to the console
  // if the log level of the message is debug and below
  level: 'debug'
})
```

Below methods can be used for logging in addition to the standard console methods (debug, error, info, warn, trace):

- **fatal**: For critical errors
- **success**: For success messages
- **todo**: For todo messages
- **newline**: For printing new lines to the console

### Levels

| Level   | Severity | Description      |
| ------- | -------- | ---------------- |
| off     | 0        | Silent mode      |
| fatal   | 1        | Critical errors  |
| error   | 2        | Errors           |
| success | 3        | Success messages |
| info    | 4        | Info messages    |
| warn    | 5        | Warnings         |
| todo    | 6        | To-do messages   |
| debug   | 7        | Debugging        |
| trace   | 8        | Tracing          |

## Models

Provides types/interfaces, hooks, and other helpers & utilities for models. Directory structure is equivalent to the backend.

## Modules

Provides types/interfaces, hooks, and other helpers & utilities for modules. Directory structure is similar to the backend.

| Module | Description           |
| ------ | --------------------- |
| auth   | Form hooks: signin    |
| i18n   | Internationalization  |
| snack  | Informational dialogs |

### Storage

- [ ] local: saves logs to the localStorage
- [ ] remote: sends logs to a remote server
