# RANDB Manager

## Requirements

- Server (where server and web application to be served)
  - Local Mac (preferable) or PC (Ubuntu 18.04)
  - or 3rd party VPS (e.g. Digital Ocean, AWS LightSails)

## MVP (Minimum Viable Product)

- Applications

  - [x] Backend Server (Node.js, Express, MongoDB, GraphQL)
  - [x] Web application (React)
  - [ ] Mobile application (React Native /cross-platform)
  - [ ] Desktop application (Electron /cross-platform)

- Languages
  - [x] English
  - [x] Russian
  - [ ] Kazakh
- Authentication & Authorization
  - Users might be assigned multiple roles
  - Roles
    - [x] System Admin (can do anything)
    - [x] Admin (can create/update/delete: users)
    - [x] Manager (can create/update/delete: data)
    - [x] Standard (can view information)
- Data
  - Source
    - [x] From Excel, CSV or any delimited text
    - [ ] Integration with a 3rd party tool (e.g. Atoll)
  - Sites
    - [x] List
    - [x] Details
    - [x] Search
    - [ ] Create
    - [ ] Update
    - [x] Delete
    - [ ] Attachments
      - [ ] TSS
      - [ ] SSV
      - [ ] ...
  - Cells
    - [x] List
    - [x] Details
    - [x] Search
    - [ ] Create
    - [ ] Update
    - [x] Delete
    - [ ] Attachments
      - [ ] Statistics
      - [ ] ...
  - ...
- Views
  - [ ] Integration with Google Earth or similar 3D map
  - ...
- Tools
  - Export
    - [ ] KML/KMZ
    - [ ] MapInfo
    - [ ] TEMS Cel
    - [ ] ...

## Tasks

| Project | Task                                              | Status    |
| ------- | ------------------------------------------------- | --------- |
| server  | Setup repository and initial server               | completed |
| server  | Add entity: user (model, api)                     | completed |
| server  | Add entity: site (model, api)                     | completed |
| server  | Add entity: cell (model, api)                     | completed |
| server  | Add i18n                                          | completed |
| server  | Add authentication                                | completed |
| server  | Seed/mock database                                | completed |
| shared  | Setup shared logic                                | completed |
| shared  | Setup shared UI                                   | completed |
| web     | Setup web application                             | completed |
| web     | Add authentication: signin                        | completed |
| web     | Add authentication: reset password                | completed |
| web     | Sidebar: site listing                             | completed |
| web     | Sidebar: cell listing                             | completed |
| web     | Sidebar: search                                   | completed |
| web     | Main content: display individual site information | completed |
| web     | Main content: display individual cell information | completed |
| shared  | Generate KML for sites                            |           |
| shared  | Generate KML for 2G cells                         |           |
| shared  | Generate KML for 3G cells                         |           |
| shared  | Generate KML for 4G cells                         |           |
| web     | Main content: Setup 3D map                        |           |
| web     | Main content: Show sites on map                   |           |
| web     | Main content: Show cells on map                   |           |
