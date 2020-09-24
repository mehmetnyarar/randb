# Web Application (@app/web)

This is a web application ([Next.js](https://nextjs.org/)) which targets all users.

## Structure

| Directory  | Description          |
| ---------- | -------------------- |
| apollo     | Apollo Client        |
| components | React components     |
| config     | Configuration        |
| pages      | Next.js pages        |
| types      | Interfaces and types |

## Apollo

This module initializes the Apollo Client.

The environment variables must be set correctly based on the settings in the server package:

- For queries and mutations; `NEXT_PUBLIC_GQL_API_URL`
- For subscriptions; `NEXT_PUBLIC_GQL_SUBSCRIPTIONS_URL`

> Adapted from [Next.js example](https://github.com/vercel/next.js/tree/canary/examples/with-apollo)

## Components

| Component | Description |
| --------- | ----------- |
| layout    | Layout      |

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
