/* eslint-disable no-use-before-define */
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type AnalyticsInput = {
  agent?: Maybe<Scalars['String']>
  origin?: Maybe<RequestOrigin>
}

export type Antenna = {
  __typename?: 'Antenna'
  beamwidth: Scalars['Float']
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  logs?: Maybe<Array<Scalars['ID']>>
  name: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
}

export type Bsc = {
  __typename?: 'Bsc'
  children: Array<Site>
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy: User
  deactivatedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  ID: Scalars['String']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  logs?: Maybe<Array<Scalars['ID']>>
  name: Scalars['String']
  network?: Maybe<NetworkType>
  type: ElementType
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy: User
}

export type Cell = {
  __typename?: 'Cell'
  antenna: Antenna
  azimuth: Scalars['Int']
  bsc?: Maybe<Bsc>
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy: User
  deactivatedAt?: Maybe<Scalars['DateTime']>
  electricalTilt: Scalars['Float']
  g2?: Maybe<Cell2G>
  g3?: Maybe<Cell3G>
  g4?: Maybe<Cell4G>
  height: Scalars['Float']
  id: Scalars['ID']
  ID: Scalars['String']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  lac?: Maybe<Lac>
  location: GeoLocation
  logs?: Maybe<Array<Scalars['ID']>>
  mechanicalTilt: Scalars['Float']
  name: Scalars['String']
  network?: Maybe<NetworkType>
  rnc?: Maybe<Rnc>
  scenario: Scenario
  sector: Scalars['String']
  site: Site
  tac?: Maybe<Tac>
  type: ElementType
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy: User
}

export type Cell2G = {
  __typename?: 'Cell2G'
  band: Cell2GBand
  bcc: Scalars['Int']
  bcch: Scalars['Int']
  mcc: Scalars['Int']
  mnc: Scalars['Int']
  ncc: Scalars['Int']
  trxNumber: Scalars['Int']
  trxPower: Scalars['Float']
}

export enum Cell2GBand {
  DCS1800 = 'DCS1800',
  GSM900 = 'GSM900',
  NONE = 'NONE'
}

export type Cell3G = {
  __typename?: 'Cell3G'
  arfcn: Scalars['Int']
  band: Cell3GBand
  pilotPower: Scalars['Float']
  psc: Scalars['Int']
  totalPower: Scalars['Float']
}

export enum Cell3GBand {
  NONE = 'NONE',
  UMTS2100 = 'UMTS2100',
  UMTS900 = 'UMTS900'
}

export type Cell4G = {
  __typename?: 'Cell4G'
  band: Cell4GBand
  channelIndex: Scalars['Int']
  dlBandwith: Scalars['Int']
  dlEarfcn: Scalars['Int']
  maxPower: Scalars['Float']
  pci: Scalars['Int']
  rsPower: Scalars['Float']
}

export enum Cell4GBand {
  FDD1800MHZ10 = 'FDD1800MHZ10',
  FDD1800MHZ15 = 'FDD1800MHZ15',
  FDD1800MHZ20 = 'FDD1800MHZ20',
  NONE = 'NONE'
}

export type CellConnection = {
  __typename?: 'CellConnection'
  edges: Array<CellEdge>
  pageInfo: PageInfo
  pages: Scalars['Int']
  total: Scalars['Int']
}

export type CellEdge = {
  __typename?: 'CellEdge'
  cursor: Scalars['ID']
  node: Cell
}

export type CellFilter = {
  agent?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  network?: Maybe<NetworkType>
  origin?: Maybe<RequestOrigin>
}

export type Cells2GFilter = {
  bands?: Maybe<Array<Cell2GBand>>
  bcc?: Maybe<Scalars['Int']>
  bcchs?: Maybe<Array<Scalars['Int']>>
  mcc?: Maybe<Scalars['Int']>
  mnc?: Maybe<Scalars['Int']>
  ncc?: Maybe<Scalars['Int']>
  trxNumber?: Maybe<FloatRangeFilter>
  trxPower?: Maybe<FloatRangeFilter>
}

export type Cells3GFilter = {
  arfcns?: Maybe<Array<Scalars['Int']>>
  bands?: Maybe<Array<Cell3GBand>>
  pilotPower?: Maybe<FloatRangeFilter>
  pscs?: Maybe<Array<Scalars['Int']>>
  totalPower?: Maybe<FloatRangeFilter>
}

export type Cells4GFilter = {
  bands?: Maybe<Array<Cell4GBand>>
  dlBandwiths?: Maybe<Array<Scalars['Int']>>
  dlEarfcns?: Maybe<Array<Scalars['Int']>>
  maxPower?: Maybe<FloatRangeFilter>
  pcis?: Maybe<Array<Scalars['Int']>>
  rsPower?: Maybe<FloatRangeFilter>
}

export type CellsFilter = {
  agent?: Maybe<Scalars['String']>
  antennas?: Maybe<Array<Scalars['ID']>>
  bscs?: Maybe<Array<Scalars['ID']>>
  createdAt?: Maybe<DateRangeFilter>
  createdBy?: Maybe<Scalars['ID']>
  electricalTilt?: Maybe<FloatRangeFilter>
  g2?: Maybe<Cells2GFilter>
  g3?: Maybe<Cells3GFilter>
  g4?: Maybe<Cells4GFilter>
  height?: Maybe<FloatRangeFilter>
  ids?: Maybe<Array<Scalars['ID']>>
  isActive?: Maybe<Scalars['Boolean']>
  isMock?: Maybe<Scalars['Boolean']>
  lacs?: Maybe<Array<Scalars['ID']>>
  mechanicalTilt?: Maybe<FloatRangeFilter>
  name?: Maybe<Scalars['String']>
  network?: Maybe<NetworkType>
  networks?: Maybe<Array<NetworkType>>
  origin?: Maybe<RequestOrigin>
  rncs?: Maybe<Array<Scalars['ID']>>
  scenarios?: Maybe<Array<Scenario>>
  sectors?: Maybe<Array<Scalars['String']>>
  site?: Maybe<Scalars['ID']>
  tacs?: Maybe<Array<Scalars['ID']>>
  type?: Maybe<ElementType>
  types?: Maybe<Array<ElementType>>
  updatedAt?: Maybe<DateRangeFilter>
  updatedBy?: Maybe<Scalars['ID']>
}

export type ConnectionInput = {
  after?: Maybe<Scalars['ID']>
  before?: Maybe<Scalars['ID']>
  first?: Maybe<Scalars['Int']>
  page?: Maybe<Scalars['Int']>
}

export enum Currency {
  EUR = 'EUR',
  KZT = 'KZT',
  TRY = 'TRY',
  USD = 'USD'
}

export type CurrentUser = {
  __typename?: 'CurrentUser'
  accessToken?: Maybe<UserToken>
  id: Scalars['ID']
  name: PersonName
  refreshToken?: Maybe<UserToken>
  roles: Array<UserRole>
}

export type DateRangeFilter = {
  max?: Maybe<Scalars['DateTime']>
  min?: Maybe<Scalars['DateTime']>
}

export type DeleteEntityInput = {
  agent?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  origin?: Maybe<RequestOrigin>
}

export type DeleteUserInput = {
  agent?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  origin?: Maybe<RequestOrigin>
}

export enum ElementType {
  BSC = 'BSC',
  CELL = 'CELL',
  LAC = 'LAC',
  RNC = 'RNC',
  SITE = 'SITE',
  TAC = 'TAC'
}

export type EntitiesFilter = {
  agent?: Maybe<Scalars['String']>
  createdAt?: Maybe<DateRangeFilter>
  createdBy?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Scalars['ID']>>
  isActive?: Maybe<Scalars['Boolean']>
  isMock?: Maybe<Scalars['Boolean']>
  origin?: Maybe<RequestOrigin>
  updatedAt?: Maybe<DateRangeFilter>
  updatedBy?: Maybe<Scalars['ID']>
}

export type Entity = {
  __typename?: 'Entity'
  createdAt?: Maybe<Scalars['DateTime']>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  logs?: Maybe<Array<Scalars['ID']>>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type EntityFilter = {
  agent?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  origin?: Maybe<RequestOrigin>
}

export type EntityInput = {
  agent?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  origin?: Maybe<RequestOrigin>
}

export enum EntityType {
  ANTENNA = 'ANTENNA',
  BSC = 'BSC',
  CELL = 'CELL',
  LAC = 'LAC',
  LOG = 'LOG',
  RNC = 'RNC',
  SITE = 'SITE',
  TAC = 'TAC',
  USER = 'USER'
}

export enum EventType {
  AUTH_SIGNIN = 'AUTH_SIGNIN',
  AUTH_SIGNOUT = 'AUTH_SIGNOUT',
  AUTH_WRONG_PASSWORD = 'AUTH_WRONG_PASSWORD',
  ENTITY_CREATE = 'ENTITY_CREATE',
  ENTITY_DELETE = 'ENTITY_DELETE',
  ENTITY_SEARCH = 'ENTITY_SEARCH',
  ENTITY_UPDATE = 'ENTITY_UPDATE',
  SYS_DEBUG = 'SYS_DEBUG',
  SYS_ERROR = 'SYS_ERROR',
  SYS_FATAL = 'SYS_FATAL',
  SYS_INFO = 'SYS_INFO',
  SYS_SUCCESS = 'SYS_SUCCESS',
  SYS_TODO = 'SYS_TODO',
  SYS_TRACE = 'SYS_TRACE',
  SYS_WARN = 'SYS_WARN'
}

export type FloatRangeFilter = {
  max?: Maybe<Scalars['Float']>
  min?: Maybe<Scalars['Float']>
}

export type GeoLocation = {
  __typename?: 'GeoLocation'
  date?: Maybe<Scalars['DateTime']>
  x: Scalars['Float']
  y: Scalars['Float']
}

export type I18n = {
  __typename?: 'I18n'
  defaultCurrency: Currency
  defaultLanguage: Language
  name: Scalars['String']
  supportedCurrencies: Array<Currency>
  supportedLanguages: Array<Language>
}

export type IntRangeFilter = {
  max?: Maybe<Scalars['Int']>
  min?: Maybe<Scalars['Int']>
}

export type Lac = {
  __typename?: 'Lac'
  children: Array<Site>
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy: User
  deactivatedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  ID: Scalars['String']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  logs?: Maybe<Array<Scalars['ID']>>
  name: Scalars['String']
  network?: Maybe<NetworkType>
  type: ElementType
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy: User
}

export enum Language {
  en = 'en',
  kz = 'kz',
  ru = 'ru',
  tr = 'tr'
}

export type Log = {
  __typename?: 'Log'
  agent?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  data?: Maybe<Scalars['String']>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  entity?: Maybe<EntityType>
  entityId?: Maybe<Scalars['ID']>
  event: EventType
  id: Scalars['ID']
  ip?: Maybe<Scalars['String']>
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  logs?: Maybe<Array<Scalars['ID']>>
  message?: Maybe<Scalars['String']>
  origin?: Maybe<RequestOrigin>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
}

export type Mutation = {
  __typename?: 'Mutation'
  deleteUser: Scalars['Boolean']
  signinUser?: Maybe<CurrentUser>
  signoutUser: Scalars['Boolean']
  upsertUser: User
}

export type MutationdeleteUserArgs = {
  data: DeleteUserInput
}

export type MutationsigninUserArgs = {
  data: SigninUserInput
}

export type MutationsignoutUserArgs = {
  data?: Maybe<SignoutUserInput>
}

export type MutationupsertUserArgs = {
  data: UpsertUserInput
}

export type NetworkElement = {
  __typename?: 'NetworkElement'
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  ID: Scalars['String']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  logs?: Maybe<Array<Scalars['ID']>>
  name: Scalars['String']
  network?: Maybe<NetworkType>
  type: ElementType
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
}

export type NetworkElementFilter = {
  agent?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  network?: Maybe<NetworkType>
  origin?: Maybe<RequestOrigin>
}

export type NetworkElementsFilter = {
  agent?: Maybe<Scalars['String']>
  createdAt?: Maybe<DateRangeFilter>
  createdBy?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Scalars['ID']>>
  isActive?: Maybe<Scalars['Boolean']>
  isMock?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  network?: Maybe<NetworkType>
  networks?: Maybe<Array<NetworkType>>
  origin?: Maybe<RequestOrigin>
  type?: Maybe<ElementType>
  types?: Maybe<Array<ElementType>>
  updatedAt?: Maybe<DateRangeFilter>
  updatedBy?: Maybe<Scalars['ID']>
}

export enum NetworkType {
  G2 = 'G2',
  G3 = 'G3',
  G4 = 'G4'
}

export type PageInfo = {
  __typename?: 'PageInfo'
  currentPage: Scalars['Int']
  endCursor: Scalars['ID']
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor: Scalars['ID']
}

export enum PersonGender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER',
  UNSPECIFIED = 'UNSPECIFIED'
}

export type PersonName = {
  __typename?: 'PersonName'
  first: Scalars['String']
  last: Scalars['String']
}

export type PersonNameFilter = {
  first?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['String']>
}

export type PersonNameInput = {
  first: Scalars['String']
  last: Scalars['String']
}

export type PhoneNumber = {
  __typename?: 'PhoneNumber'
  cc: Scalars['String']
  dc: Scalars['String']
  sn: Scalars['String']
}

export type PhoneNumberFilter = {
  cc?: Maybe<Scalars['String']>
  dc?: Maybe<Scalars['String']>
  sn?: Maybe<Scalars['String']>
}

export type PhoneNumberInput = {
  cc: Scalars['String']
  dc: Scalars['String']
  sn: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  bsc?: Maybe<Bsc>
  bscs: Array<Bsc>
  cell?: Maybe<Cell>
  cells: Array<Cell>
  currentUser?: Maybe<CurrentUser>
  lac?: Maybe<Lac>
  lacs: Array<Lac>
  pagedCells: CellConnection
  pagedSites: SiteConnection
  pagedUsers: UserConnection
  rnc?: Maybe<Rnc>
  rncs: Array<Rnc>
  site?: Maybe<Site>
  sites: Array<Site>
  tac?: Maybe<Tac>
  tacs: Array<Tac>
  user?: Maybe<User>
  users: Array<User>
  welcome: Scalars['String']
}

export type QuerybscArgs = {
  filter: NetworkElementFilter
}

export type QuerybscsArgs = {
  filter?: Maybe<NetworkElementsFilter>
}

export type QuerycellArgs = {
  filter: CellFilter
}

export type QuerycellsArgs = {
  filter?: Maybe<CellsFilter>
}

export type QuerylacArgs = {
  filter: NetworkElementFilter
}

export type QuerylacsArgs = {
  filter?: Maybe<NetworkElementsFilter>
}

export type QuerypagedCellsArgs = {
  connection?: Maybe<ConnectionInput>
  filter?: Maybe<CellsFilter>
}

export type QuerypagedSitesArgs = {
  connection?: Maybe<ConnectionInput>
  filter?: Maybe<SitesFilter>
}

export type QuerypagedUsersArgs = {
  connection?: Maybe<ConnectionInput>
  filter?: Maybe<UsersFilter>
}

export type QueryrncArgs = {
  filter: NetworkElementFilter
}

export type QueryrncsArgs = {
  filter?: Maybe<NetworkElementsFilter>
}

export type QuerysiteArgs = {
  filter: SiteFilter
}

export type QuerysitesArgs = {
  filter?: Maybe<SitesFilter>
}

export type QuerytacArgs = {
  filter: NetworkElementFilter
}

export type QuerytacsArgs = {
  filter?: Maybe<NetworkElementsFilter>
}

export type QueryuserArgs = {
  filter: UserFilter
}

export type QueryusersArgs = {
  filter?: Maybe<UsersFilter>
}

export enum RequestOrigin {
  MOBILE = 'MOBILE',
  WEB = 'WEB'
}

export type Rnc = {
  __typename?: 'Rnc'
  children: Array<Site>
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy: User
  deactivatedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  ID: Scalars['String']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  logs?: Maybe<Array<Scalars['ID']>>
  name: Scalars['String']
  network?: Maybe<NetworkType>
  type: ElementType
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy: User
}

export enum Scenario {
  INDOOR = 'INDOOR',
  NONE = 'NONE',
  OUTDOOR = 'OUTDOOR'
}

export enum SigninMethod {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  USERNAME = 'USERNAME'
}

export type SigninUserInput = {
  agent?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  method?: Maybe<SigninMethod>
  origin?: Maybe<RequestOrigin>
  password: Scalars['String']
  phone?: Maybe<PhoneNumberInput>
  username?: Maybe<Scalars['String']>
}

export type SignoutUserInput = {
  agent?: Maybe<Scalars['String']>
  origin?: Maybe<RequestOrigin>
}

export type Site = {
  __typename?: 'Site'
  bsc?: Maybe<Bsc>
  children: Array<Cell>
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy: User
  deactivatedAt?: Maybe<Scalars['DateTime']>
  g2: Array<Scalars['ID']>
  g3: Array<Scalars['ID']>
  g4: Array<Scalars['ID']>
  id: Scalars['ID']
  ID: Scalars['String']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  lac?: Maybe<Lac>
  location: GeoLocation
  logs?: Maybe<Array<Scalars['ID']>>
  name: Scalars['String']
  network?: Maybe<NetworkType>
  rnc?: Maybe<Rnc>
  tac?: Maybe<Tac>
  type: ElementType
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy: User
}

export type SiteConnection = {
  __typename?: 'SiteConnection'
  edges: Array<SiteEdge>
  pageInfo: PageInfo
  pages: Scalars['Int']
  total: Scalars['Int']
}

export type SiteEdge = {
  __typename?: 'SiteEdge'
  cursor: Scalars['ID']
  node: Site
}

export type SiteFilter = {
  agent?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  network?: Maybe<NetworkType>
  origin?: Maybe<RequestOrigin>
}

export type SitesFilter = {
  agent?: Maybe<Scalars['String']>
  bscs?: Maybe<Scalars['ID']>
  createdAt?: Maybe<DateRangeFilter>
  createdBy?: Maybe<Scalars['ID']>
  ids?: Maybe<Array<Scalars['ID']>>
  isActive?: Maybe<Scalars['Boolean']>
  isMock?: Maybe<Scalars['Boolean']>
  lacs?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  network?: Maybe<NetworkType>
  networks?: Maybe<Array<NetworkType>>
  origin?: Maybe<RequestOrigin>
  rncs?: Maybe<Scalars['ID']>
  tacs?: Maybe<Scalars['ID']>
  type?: Maybe<ElementType>
  types?: Maybe<Array<ElementType>>
  updatedAt?: Maybe<DateRangeFilter>
  updatedBy?: Maybe<Scalars['ID']>
}

export type Tac = {
  __typename?: 'Tac'
  children: Array<Site>
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy: User
  deactivatedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  ID: Scalars['String']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  logs?: Maybe<Array<Scalars['ID']>>
  name: Scalars['String']
  network?: Maybe<NetworkType>
  type: ElementType
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy: User
}

export type UpsertUserInput = {
  agent?: Maybe<Scalars['String']>
  birthday?: Maybe<Scalars['DateTime']>
  email: Scalars['String']
  gender: PersonGender
  id?: Maybe<Scalars['ID']>
  name: PersonNameInput
  origin?: Maybe<RequestOrigin>
  password?: Maybe<Scalars['String']>
  phone: PhoneNumberInput
  roles: Array<UserRole>
  username?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  birthday?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  email: Scalars['String']
  gender: PersonGender
  id: Scalars['ID']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  location?: Maybe<GeoLocation>
  locations: Array<GeoLocation>
  logs?: Maybe<Array<Scalars['ID']>>
  name: PersonName
  phone: PhoneNumber
  roles: Array<UserRole>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
  username: Scalars['String']
}

export type UserConnection = {
  __typename?: 'UserConnection'
  edges: Array<UserEdge>
  pageInfo: PageInfo
  pages: Scalars['Int']
  total: Scalars['Int']
}

export type UserEdge = {
  __typename?: 'UserEdge'
  cursor: Scalars['ID']
  node: User
}

export type UserFilter = {
  agent?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  origin?: Maybe<RequestOrigin>
  phone?: Maybe<PhoneNumberFilter>
  username?: Maybe<Scalars['String']>
}

export type UserProfileInput = {
  agent?: Maybe<Scalars['String']>
  birthday?: Maybe<Scalars['DateTime']>
  email: Scalars['String']
  gender: PersonGender
  id?: Maybe<Scalars['ID']>
  name: PersonNameInput
  origin?: Maybe<RequestOrigin>
  phone: PhoneNumberInput
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  SA = 'SA',
  USER = 'USER'
}

export type UsersFilter = {
  agent?: Maybe<Scalars['String']>
  birthday?: Maybe<DateRangeFilter>
  createdAt?: Maybe<DateRangeFilter>
  createdBy?: Maybe<Scalars['ID']>
  email?: Maybe<Scalars['String']>
  gender?: Maybe<Array<PersonGender>>
  ids?: Maybe<Array<Scalars['ID']>>
  isActive?: Maybe<Scalars['Boolean']>
  isMock?: Maybe<Scalars['Boolean']>
  name?: Maybe<PersonNameFilter>
  origin?: Maybe<RequestOrigin>
  phone?: Maybe<PhoneNumberFilter>
  roles?: Maybe<Array<UserRole>>
  updatedAt?: Maybe<DateRangeFilter>
  updatedBy?: Maybe<Scalars['ID']>
  username?: Maybe<Scalars['String']>
}

export type UserToken = {
  __typename?: 'UserToken'
  expires: Scalars['DateTime']
  name: Scalars['String']
  value: Scalars['String']
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = { __typename?: 'Query' } & {
  currentUser?: Maybe<
    { __typename?: 'CurrentUser' } & Pick<CurrentUser, 'id' | 'roles'> & {
        name: { __typename?: 'PersonName' } & Pick<PersonName, 'first' | 'last'>
      }
  >
}

export type SigninUserMutationVariables = Exact<{
  data: SigninUserInput
}>

export type SigninUserMutation = { __typename?: 'Mutation' } & {
  signinUser?: Maybe<
    { __typename?: 'CurrentUser' } & Pick<CurrentUser, 'id' | 'roles'> & {
        name: { __typename?: 'PersonName' } & Pick<PersonName, 'first' | 'last'>
        accessToken?: Maybe<
          { __typename?: 'UserToken' } & Pick<
            UserToken,
            'name' | 'value' | 'expires'
          >
        >
        refreshToken?: Maybe<
          { __typename?: 'UserToken' } & Pick<
            UserToken,
            'name' | 'value' | 'expires'
          >
        >
      }
  >
}

export type SignoutUserMutationVariables = Exact<{
  data: SignoutUserInput
}>

export type SignoutUserMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'signoutUser'
>

export type BSCsQueryVariables = Exact<{
  filter?: Maybe<NetworkElementsFilter>
}>

export type BSCsQuery = { __typename?: 'Query' } & {
  bscs: Array<
    { __typename?: 'Bsc' } & Pick<
      Bsc,
      'id' | 'name' | 'type' | 'network' | 'isActive'
    > & {
        children: Array<
          { __typename?: 'Site' } & Pick<
            Site,
            'id' | 'name' | 'type' | 'network' | 'isActive'
          > & {
              children: Array<
                { __typename?: 'Cell' } & Pick<
                  Cell,
                  'id' | 'name' | 'type' | 'network' | 'isActive'
                >
              >
            }
        >
      }
  >
}

export type WelcomeQueryVariables = Exact<{ [key: string]: never }>

export type WelcomeQuery = { __typename?: 'Query' } & Pick<Query, 'welcome'>

export type RNCsQueryVariables = Exact<{
  filter?: Maybe<NetworkElementsFilter>
}>

export type RNCsQuery = { __typename?: 'Query' } & {
  rncs: Array<
    { __typename?: 'Rnc' } & Pick<
      Rnc,
      'id' | 'name' | 'type' | 'network' | 'isActive'
    > & {
        children: Array<
          { __typename?: 'Site' } & Pick<
            Site,
            'id' | 'name' | 'type' | 'network' | 'isActive'
          > & {
              children: Array<
                { __typename?: 'Cell' } & Pick<
                  Cell,
                  'id' | 'name' | 'type' | 'network' | 'isActive'
                >
              >
            }
        >
      }
  >
}

export type TACsQueryVariables = Exact<{
  filter?: Maybe<NetworkElementsFilter>
}>

export type TACsQuery = { __typename?: 'Query' } & {
  tacs: Array<
    { __typename?: 'Tac' } & Pick<
      Tac,
      'id' | 'name' | 'type' | 'network' | 'isActive'
    > & {
        children: Array<
          { __typename?: 'Site' } & Pick<
            Site,
            'id' | 'name' | 'type' | 'network' | 'isActive'
          > & {
              children: Array<
                { __typename?: 'Cell' } & Pick<
                  Cell,
                  'id' | 'name' | 'type' | 'network' | 'isActive'
                >
              >
            }
        >
      }
  >
}

export type DeleteUserMutationVariables = Exact<{
  data: DeleteUserInput
}>

export type DeleteUserMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteUser'
>

export type PagedUsersQueryVariables = Exact<{
  filter?: Maybe<UsersFilter>
  connection?: Maybe<ConnectionInput>
}>

export type PagedUsersQuery = { __typename?: 'Query' } & {
  pagedUsers: { __typename?: 'UserConnection' } & Pick<
    UserConnection,
    'total' | 'pages'
  > & {
      edges: Array<
        { __typename?: 'UserEdge' } & Pick<UserEdge, 'cursor'> & {
            node: { __typename?: 'User' } & Pick<
              User,
              'id' | 'username' | 'email' | 'roles' | 'isMock' | 'isActive'
            > & {
                name: { __typename?: 'PersonName' } & Pick<
                  PersonName,
                  'first' | 'last'
                >
                phone: { __typename?: 'PhoneNumber' } & Pick<
                  PhoneNumber,
                  'cc' | 'dc' | 'sn'
                >
              }
          }
      >
      pageInfo: { __typename?: 'PageInfo' } & Pick<
        PageInfo,
        | 'currentPage'
        | 'hasPreviousPage'
        | 'startCursor'
        | 'hasNextPage'
        | 'endCursor'
      >
    }
}

export type UpsertUserMutationVariables = Exact<{
  data: UpsertUserInput
}>

export type UpsertUserMutation = { __typename?: 'Mutation' } & {
  upsertUser: { __typename?: 'User' } & Pick<
    User,
    | 'id'
    | 'username'
    | 'email'
    | 'gender'
    | 'birthday'
    | 'roles'
    | 'createdAt'
    | 'updatedAt'
    | 'isMock'
    | 'isActive'
    | 'deactivatedAt'
  > & {
      name: { __typename?: 'PersonName' } & Pick<PersonName, 'first' | 'last'>
      phone: { __typename?: 'PhoneNumber' } & Pick<
        PhoneNumber,
        'cc' | 'dc' | 'sn'
      >
      createdBy?: Maybe<
        { __typename?: 'User' } & Pick<User, 'id'> & {
            name: { __typename?: 'PersonName' } & Pick<
              PersonName,
              'first' | 'last'
            >
          }
      >
      updatedBy?: Maybe<
        { __typename?: 'User' } & Pick<User, 'id'> & {
            name: { __typename?: 'PersonName' } & Pick<
              PersonName,
              'first' | 'last'
            >
          }
      >
    }
}

export type UserQueryVariables = Exact<{
  filter: UserFilter
}>

export type UserQuery = { __typename?: 'Query' } & {
  user?: Maybe<
    { __typename?: 'User' } & Pick<
      User,
      | 'id'
      | 'username'
      | 'email'
      | 'gender'
      | 'birthday'
      | 'roles'
      | 'createdAt'
      | 'updatedAt'
      | 'isMock'
      | 'isActive'
      | 'deactivatedAt'
    > & {
        name: { __typename?: 'PersonName' } & Pick<PersonName, 'first' | 'last'>
        phone: { __typename?: 'PhoneNumber' } & Pick<
          PhoneNumber,
          'cc' | 'dc' | 'sn'
        >
        createdBy?: Maybe<
          { __typename?: 'User' } & Pick<User, 'id'> & {
              name: { __typename?: 'PersonName' } & Pick<
                PersonName,
                'first' | 'last'
              >
            }
        >
        updatedBy?: Maybe<
          { __typename?: 'User' } & Pick<User, 'id'> & {
              name: { __typename?: 'PersonName' } & Pick<
                PersonName,
                'first' | 'last'
              >
            }
        >
      }
  >
}

export type UsersQueryVariables = Exact<{
  filter?: Maybe<UsersFilter>
}>

export type UsersQuery = { __typename?: 'Query' } & {
  users: Array<
    { __typename?: 'User' } & Pick<
      User,
      'id' | 'username' | 'email' | 'roles' | 'isMock' | 'isActive'
    > & {
        name: { __typename?: 'PersonName' } & Pick<PersonName, 'first' | 'last'>
        phone: { __typename?: 'PhoneNumber' } & Pick<
          PhoneNumber,
          'cc' | 'dc' | 'sn'
        >
      }
  >
}

export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser {
      id
      name {
        first
        last
      }
      roles
    }
  }
`

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery (
  baseOptions?: Apollo.QueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions
  )
}
export function useCurrentUserLazyQuery (
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions
  )
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>
export type CurrentUserLazyQueryHookResult = ReturnType<
  typeof useCurrentUserLazyQuery
>
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>
export function refetchCurrentUserQuery (variables?: CurrentUserQueryVariables) {
  return { query: CurrentUserDocument, variables: variables }
}
export const SigninUserDocument = gql`
  mutation SigninUser($data: SigninUserInput!) {
    signinUser(data: $data) {
      id
      name {
        first
        last
      }
      roles
      accessToken {
        name
        value
        expires
      }
      refreshToken {
        name
        value
        expires
      }
    }
  }
`
export type SigninUserMutationFn = Apollo.MutationFunction<
  SigninUserMutation,
  SigninUserMutationVariables
>

/**
 * __useSigninUserMutation__
 *
 * To run a mutation, you first call `useSigninUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinUserMutation, { data, loading, error }] = useSigninUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSigninUserMutation (
  baseOptions?: Apollo.MutationHookOptions<
    SigninUserMutation,
    SigninUserMutationVariables
  >
) {
  return Apollo.useMutation<SigninUserMutation, SigninUserMutationVariables>(
    SigninUserDocument,
    baseOptions
  )
}
export type SigninUserMutationHookResult = ReturnType<
  typeof useSigninUserMutation
>
export type SigninUserMutationResult = Apollo.MutationResult<SigninUserMutation>
export type SigninUserMutationOptions = Apollo.BaseMutationOptions<
  SigninUserMutation,
  SigninUserMutationVariables
>
export const SignoutUserDocument = gql`
  mutation SignoutUser($data: SignoutUserInput!) {
    signoutUser(data: $data)
  }
`
export type SignoutUserMutationFn = Apollo.MutationFunction<
  SignoutUserMutation,
  SignoutUserMutationVariables
>

/**
 * __useSignoutUserMutation__
 *
 * To run a mutation, you first call `useSignoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signoutUserMutation, { data, loading, error }] = useSignoutUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignoutUserMutation (
  baseOptions?: Apollo.MutationHookOptions<
    SignoutUserMutation,
    SignoutUserMutationVariables
  >
) {
  return Apollo.useMutation<SignoutUserMutation, SignoutUserMutationVariables>(
    SignoutUserDocument,
    baseOptions
  )
}
export type SignoutUserMutationHookResult = ReturnType<
  typeof useSignoutUserMutation
>
export type SignoutUserMutationResult = Apollo.MutationResult<
  SignoutUserMutation
>
export type SignoutUserMutationOptions = Apollo.BaseMutationOptions<
  SignoutUserMutation,
  SignoutUserMutationVariables
>
export const BSCsDocument = gql`
  query BSCs($filter: NetworkElementsFilter) {
    bscs(filter: $filter) {
      id
      name
      type
      network
      isActive
      children {
        id
        name
        type
        network
        isActive
        children {
          id
          name
          type
          network
          isActive
        }
      }
    }
  }
`

/**
 * __useBSCsQuery__
 *
 * To run a query within a React component, call `useBSCsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBSCsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBSCsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useBSCsQuery (
  baseOptions?: Apollo.QueryHookOptions<BSCsQuery, BSCsQueryVariables>
) {
  return Apollo.useQuery<BSCsQuery, BSCsQueryVariables>(
    BSCsDocument,
    baseOptions
  )
}
export function useBSCsLazyQuery (
  baseOptions?: Apollo.LazyQueryHookOptions<BSCsQuery, BSCsQueryVariables>
) {
  return Apollo.useLazyQuery<BSCsQuery, BSCsQueryVariables>(
    BSCsDocument,
    baseOptions
  )
}
export type BSCsQueryHookResult = ReturnType<typeof useBSCsQuery>
export type BSCsLazyQueryHookResult = ReturnType<typeof useBSCsLazyQuery>
export type BSCsQueryResult = Apollo.QueryResult<BSCsQuery, BSCsQueryVariables>
export function refetchBSCsQuery (variables?: BSCsQueryVariables) {
  return { query: BSCsDocument, variables: variables }
}
export const WelcomeDocument = gql`
  query Welcome {
    welcome
  }
`

/**
 * __useWelcomeQuery__
 *
 * To run a query within a React component, call `useWelcomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useWelcomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWelcomeQuery({
 *   variables: {
 *   },
 * });
 */
export function useWelcomeQuery (
  baseOptions?: Apollo.QueryHookOptions<WelcomeQuery, WelcomeQueryVariables>
) {
  return Apollo.useQuery<WelcomeQuery, WelcomeQueryVariables>(
    WelcomeDocument,
    baseOptions
  )
}
export function useWelcomeLazyQuery (
  baseOptions?: Apollo.LazyQueryHookOptions<WelcomeQuery, WelcomeQueryVariables>
) {
  return Apollo.useLazyQuery<WelcomeQuery, WelcomeQueryVariables>(
    WelcomeDocument,
    baseOptions
  )
}
export type WelcomeQueryHookResult = ReturnType<typeof useWelcomeQuery>
export type WelcomeLazyQueryHookResult = ReturnType<typeof useWelcomeLazyQuery>
export type WelcomeQueryResult = Apollo.QueryResult<
  WelcomeQuery,
  WelcomeQueryVariables
>
export function refetchWelcomeQuery (variables?: WelcomeQueryVariables) {
  return { query: WelcomeDocument, variables: variables }
}
export const RNCsDocument = gql`
  query RNCs($filter: NetworkElementsFilter) {
    rncs(filter: $filter) {
      id
      name
      type
      network
      isActive
      children {
        id
        name
        type
        network
        isActive
        children {
          id
          name
          type
          network
          isActive
        }
      }
    }
  }
`

/**
 * __useRNCsQuery__
 *
 * To run a query within a React component, call `useRNCsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRNCsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRNCsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useRNCsQuery (
  baseOptions?: Apollo.QueryHookOptions<RNCsQuery, RNCsQueryVariables>
) {
  return Apollo.useQuery<RNCsQuery, RNCsQueryVariables>(
    RNCsDocument,
    baseOptions
  )
}
export function useRNCsLazyQuery (
  baseOptions?: Apollo.LazyQueryHookOptions<RNCsQuery, RNCsQueryVariables>
) {
  return Apollo.useLazyQuery<RNCsQuery, RNCsQueryVariables>(
    RNCsDocument,
    baseOptions
  )
}
export type RNCsQueryHookResult = ReturnType<typeof useRNCsQuery>
export type RNCsLazyQueryHookResult = ReturnType<typeof useRNCsLazyQuery>
export type RNCsQueryResult = Apollo.QueryResult<RNCsQuery, RNCsQueryVariables>
export function refetchRNCsQuery (variables?: RNCsQueryVariables) {
  return { query: RNCsDocument, variables: variables }
}
export const TACsDocument = gql`
  query TACs($filter: NetworkElementsFilter) {
    tacs(filter: $filter) {
      id
      name
      type
      network
      isActive
      children {
        id
        name
        type
        network
        isActive
        children {
          id
          name
          type
          network
          isActive
        }
      }
    }
  }
`

/**
 * __useTACsQuery__
 *
 * To run a query within a React component, call `useTACsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTACsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTACsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useTACsQuery (
  baseOptions?: Apollo.QueryHookOptions<TACsQuery, TACsQueryVariables>
) {
  return Apollo.useQuery<TACsQuery, TACsQueryVariables>(
    TACsDocument,
    baseOptions
  )
}
export function useTACsLazyQuery (
  baseOptions?: Apollo.LazyQueryHookOptions<TACsQuery, TACsQueryVariables>
) {
  return Apollo.useLazyQuery<TACsQuery, TACsQueryVariables>(
    TACsDocument,
    baseOptions
  )
}
export type TACsQueryHookResult = ReturnType<typeof useTACsQuery>
export type TACsLazyQueryHookResult = ReturnType<typeof useTACsLazyQuery>
export type TACsQueryResult = Apollo.QueryResult<TACsQuery, TACsQueryVariables>
export function refetchTACsQuery (variables?: TACsQueryVariables) {
  return { query: TACsDocument, variables: variables }
}
export const DeleteUserDocument = gql`
  mutation DeleteUser($data: DeleteUserInput!) {
    deleteUser(data: $data)
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteUserMutation (
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >
) {
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    baseOptions
  )
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>
export const PagedUsersDocument = gql`
  query PagedUsers($filter: UsersFilter, $connection: ConnectionInput) {
    pagedUsers(filter: $filter, connection: $connection) {
      total
      edges {
        node {
          id
          username
          name {
            first
            last
          }
          email
          phone {
            cc
            dc
            sn
          }
          roles
          isMock
          isActive
        }
        cursor
      }
      pages
      pageInfo {
        currentPage
        hasPreviousPage
        startCursor
        hasNextPage
        endCursor
      }
    }
  }
`

/**
 * __usePagedUsersQuery__
 *
 * To run a query within a React component, call `usePagedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePagedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePagedUsersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      connection: // value for 'connection'
 *   },
 * });
 */
export function usePagedUsersQuery (
  baseOptions?: Apollo.QueryHookOptions<
    PagedUsersQuery,
    PagedUsersQueryVariables
  >
) {
  return Apollo.useQuery<PagedUsersQuery, PagedUsersQueryVariables>(
    PagedUsersDocument,
    baseOptions
  )
}
export function usePagedUsersLazyQuery (
  baseOptions?: Apollo.LazyQueryHookOptions<
    PagedUsersQuery,
    PagedUsersQueryVariables
  >
) {
  return Apollo.useLazyQuery<PagedUsersQuery, PagedUsersQueryVariables>(
    PagedUsersDocument,
    baseOptions
  )
}
export type PagedUsersQueryHookResult = ReturnType<typeof usePagedUsersQuery>
export type PagedUsersLazyQueryHookResult = ReturnType<
  typeof usePagedUsersLazyQuery
>
export type PagedUsersQueryResult = Apollo.QueryResult<
  PagedUsersQuery,
  PagedUsersQueryVariables
>
export function refetchPagedUsersQuery (variables?: PagedUsersQueryVariables) {
  return { query: PagedUsersDocument, variables: variables }
}
export const UpsertUserDocument = gql`
  mutation UpsertUser($data: UpsertUserInput!) {
    upsertUser(data: $data) {
      id
      username
      name {
        first
        last
      }
      email
      phone {
        cc
        dc
        sn
      }
      gender
      birthday
      roles
      createdAt
      createdBy {
        id
        name {
          first
          last
        }
      }
      updatedAt
      updatedBy {
        id
        name {
          first
          last
        }
      }
      isMock
      isActive
      deactivatedAt
    }
  }
`
export type UpsertUserMutationFn = Apollo.MutationFunction<
  UpsertUserMutation,
  UpsertUserMutationVariables
>

/**
 * __useUpsertUserMutation__
 *
 * To run a mutation, you first call `useUpsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertUserMutation, { data, loading, error }] = useUpsertUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpsertUserMutation (
  baseOptions?: Apollo.MutationHookOptions<
    UpsertUserMutation,
    UpsertUserMutationVariables
  >
) {
  return Apollo.useMutation<UpsertUserMutation, UpsertUserMutationVariables>(
    UpsertUserDocument,
    baseOptions
  )
}
export type UpsertUserMutationHookResult = ReturnType<
  typeof useUpsertUserMutation
>
export type UpsertUserMutationResult = Apollo.MutationResult<UpsertUserMutation>
export type UpsertUserMutationOptions = Apollo.BaseMutationOptions<
  UpsertUserMutation,
  UpsertUserMutationVariables
>
export const UserDocument = gql`
  query User($filter: UserFilter!) {
    user(filter: $filter) {
      id
      username
      name {
        first
        last
      }
      email
      phone {
        cc
        dc
        sn
      }
      gender
      birthday
      roles
      createdAt
      createdBy {
        id
        name {
          first
          last
        }
      }
      updatedAt
      updatedBy {
        id
        name {
          first
          last
        }
      }
      isMock
      isActive
      deactivatedAt
    }
  }
`

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUserQuery (
  baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  return Apollo.useQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  )
}
export function useUserLazyQuery (
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  )
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>
export function refetchUserQuery (variables?: UserQueryVariables) {
  return { query: UserDocument, variables: variables }
}
export const UsersDocument = gql`
  query Users($filter: UsersFilter) {
    users(filter: $filter) {
      id
      username
      name {
        first
        last
      }
      email
      phone {
        cc
        dc
        sn
      }
      roles
      isMock
      isActive
    }
  }
`

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUsersQuery (
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  )
}
export function useUsersLazyQuery (
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  )
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>
export function refetchUsersQuery (variables?: UsersQueryVariables) {
  return { query: UsersDocument, variables: variables }
}
