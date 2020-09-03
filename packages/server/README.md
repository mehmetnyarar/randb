# Server (@app/server)

This is a back-end server which provides data access and business logic to the front-end applications.

## Structure

| Directory | Description          |
| --------- | -------------------- |
| config    | Configuration        |
| express   | Express application  |
| logger    | Logging utility      |
| modules   | Server functionality |

## Config

Configuration of any sort is provided via constants and environment variables that are located in the `~/config` directory.

- Check `.env.config` to see how environment variables are/should be set
- Check `~/config/env` to see how environment variables are configured

## Express

- Custom Express middlewares are/should be located at `~/express/middlewares`

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

### Storage

- [ ] db: saves logs to the database
- [x] file: saves logs in the filesystem
- [ ] remote: sends logs to a remote server

## Modules

Modules which are located in the `~/modules` directory extend the functionality of the server.

| Module | Description             |
| ------ | ----------------------- |
| fs     | File system and uploads |
