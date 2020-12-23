# TODO

- [ ] Switch to [Recoil](https://recoiljs.org/) instead of React context API
- [ ] Upgrade Expo version to [40](https://blog.expo.io/expo-sdk-40-is-now-available-d4d73e67da33)
- [ ] Upgrade Next version to [10](https://nextjs.org/blog/next-10)
- [ ] `generate-password` module causes an error for the mobile application during the build since it utilizes Node/crypto. Either replace it with more suitable module made for react native (`expo-crypto`) or move it to the web package.
- [ ] (CD) Dockerize the following apps: server, logic, ui, web
- [ ] (CI) Implement GitHub actions
- [ ] Complete unit tests:
  - [ ] server
  - [ ] logic
  - [ ] ui
  - [ ] web
  - [ ] mobile
- [ ] Create e2e tests for the mobile app with cypress
- [ ] Create e2e tests for the web app with cypress
