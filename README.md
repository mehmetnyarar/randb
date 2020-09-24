# RAN Database Manager

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is the repository for the RAN DB Manager applications.

## Packages

| Package      | Location              | Description                    |
| ------------ | --------------------- | ------------------------------ |
| @app/server  | packages/server       | Data access and business logic |
| @app/logic   | packages/shared-logic | Application logic              |
| @app/ui      | packages/shared-ui    | Themes, styles and components  |
| @app/web     | packages/app-web      | Web application                |
| @app/mobile  | packages/app-mobile   | Mobile application             |
| @app/desktop | packages/app-desktop  | Desktop application            |

> Each package has its own README

## Scripts

| Script              | Description                                                               |
| ------------------- | ------------------------------------------------------------------------- |
| reset               | Cleans up the repository and installs npm modules                         |
| clean               | Removes npm modules, packager files and cleans up the packages            |
| validate            | Validates all packages                                                    |
| typings             | Validates TS typings in all packages                                      |
| format              | Formats files                                                             |
| format:root         | Formats files under the root directory                                    |
| format:packages     | Formats files in all packages                                             |
| lint                | Lints files                                                               |
| lint:root           | Lints files under the root directory                                      |
| lint:packages       | Lints files in all packages                                               |
| test                | Runs tests for the root directory and the packages                        |
| test:coverage       | Runs tests and generates coverage reports                                 |
| precommit           | Ensures that the files are formatted, linted and tested before any commit |
| commit              | Commits changes based on conventional commits standards                   |
| dev:server          | Starts the server in development mode                                     |
| test:server         | Runs tests for the server                                                 |
| start:server        | Starts the server in production mode                                      |
| apollo:service:push | Pushes a service definition to Apollo Graph Manager (requires APOLLO_KEY) |
| generate-gql        | Generates GraphQL types                                                   |
| dev:logic           | Watches changes in the logic library during the development               |
| test:logic          | Runs tests for the logic library                                          |
| build:logic         | Builds shared logic for the production mode                               |
| apollo:client:check | Checks logic library against a pushed service (requires APOLLO_KEY)       |
| dev:ui              | Watches changes in the ui library during the development                  |
| test:ui             | Runs tests for the ui library                                             |
| build:ui            | Builds shared ui for the production mode                                  |
| dev:web             | Runs the web app in development mode                                      |
| test:web            | Runs tests for the web app                                                |
| build:web           | Initializes the web app for production                                    |
| start:web           | Starts the web app in production mode                                     |

You can run scripts from packages using `yarn` or `lerna`:

```sh
yarn --cwd packages/<pkg-dir> <script>
lerna run <script> --scope=<pkg-name> --stream
```

## Dependencies

```sh
# root level
yarn <add/remove> <npm-package> -W[D]

# package level
yarn workspace @app/<pkg-name> <add/remove> <npm-package> [-D]
```

## Commits

Use `yarn commit` command to commit changes.

- For changes in the root directory, there is no need to specify the scope
- For changes in the packages, specify the scope using the directory name

## Development

TODO

- [ ] Create and configure `.env` in `packages/server`
- [ ] Create and configure `~/config/env/env.ts` in `packages/shared-logic`
- [ ] Update brand colors (`~/theme/palette/brand.ts` in `packages/shared-ui`)

```sh
yarn dev:server
yarn dev:logic
yarn dev:ui
```

## Testing

```sh
yarn test:server
yarn test:logic
yarn test:ui
```

## Production
