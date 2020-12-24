# Web Application (@app/web)

This is a web application ([Next.js](https://nextjs.org/)) which targets all users.

## Structure

| Directory  | Description                |
| ---------- | -------------------------- |
| components | React components           |
| pages      | Next.js pages              |
| state      | Recoil atoms and selectors |
| types      | Interfaces and types       |
| config     | Configuration              |
| i18n       | I18n                       |

## Apollo

This module initializes the Apollo Client.

The environment variables must be set correctly based on the settings in the server package:

- For queries and mutations; `NEXT_PUBLIC_GQL_API_URL`
- For subscriptions; `NEXT_PUBLIC_GQL_SUBSCRIPTIONS_URL`

> Adapted from [Next.js example](https://github.com/vercel/next.js/tree/canary/examples/with-apollo)

## Components

| Component | Description                       |
| --------- | --------------------------------- |
| button    | Buttons                           |
| form      | Fields, labels, input groups, etc |
| snackbar  | Modal dialog for messages         |
| language  | Language selection                |
| layout    | Layout                            |
| sidebar   | Sidebar                           |
| theme     | Theme selection                   |

## Configuration

Configuration of any sort is provided via constants and environment variables.

- Check `.env.config` to see how environment variables are/should be set
- Check `~/config.ts` to see how environment variables are configured

## Pages

| Component | Description  | URL     |
| --------- | ------------ | ------- |
| \_app     | Next wrapper |
| index     | Home page    | /       |
| signin    | Signin page  | /signin |

## I18n

- [next-i18next](https://github.com/isaachinman/next-i18next)
- [Next Cookies](https://github.com/matthewmueller/next-cookies)

Translations can be found under the `public/static/locales` directory.
