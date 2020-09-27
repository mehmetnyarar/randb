# Mobile Application (@app/mobile)

[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

This is a mobile application which targets all users.

## Structure

| Directory  | Description      |
| ---------- | ---------------- |
| apollo     | Apollo Client    |
| components | React components |
| config     | Configuration    |
| icons      | Icons            |
| navigation | React navigation |
| screens    | Screens          |

## Apollo

This module initializes the Apollo Client.

The environment variables must be set correctly based on the settings in the server package:

- For queries and mutations; `GQL_API_URL`
- For subscriptions; `GQL_SUBSCRIPTIONS_URL`

## Components

| Component | Description     |
| --------- | --------------- |
| button    | Buttons         |
| layout    | Layout          |
| theme     | Theme selection |

## Configuration

Configuration of any sort is provided via constants and environment variables.

- Check `.env.config` to see how environment variables are/should be set
- Check `~/config.ts` to see how environment variables are configured

## Navigation

- Auth/Stack
  - Signin
- Menu/Drawer
  - Main/BottomTab
    - Home
    - Profile
  - About
  - Contact
  - Settings
