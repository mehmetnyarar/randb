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
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  ID?: Maybe<Scalars['String']>
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  logs?: Maybe<Array<Scalars['ID']>>
  name: Scalars['String']
  sites: Scalars['ID']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
}

export type Cell = {
  __typename?: 'Cell'
  antenna: Antenna
  azimuth: Scalars['Int']
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  electricalTilt: Scalars['Float']
  height: Scalars['Float']
  id: Scalars['ID']
  ID: Scalars['String']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  lac?: Maybe<Lac>
  logs?: Maybe<Array<Scalars['ID']>>
  mechanicalTilt: Scalars['Float']
  name: Scalars['String']
  scenario: Scenario
  sector: Scalars['String']
  site: Site
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
}

export type Cell2G = {
  __typename?: 'Cell2G'
  antenna: Antenna
  azimuth: Scalars['Int']
  band: Cell2GBand
  bcc: Scalars['Int']
  bcch: Scalars['Int']
  bsc: Bsc
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  electricalTilt: Scalars['Float']
  height: Scalars['Float']
  id: Scalars['ID']
  ID: Scalars['String']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  lac?: Maybe<Lac>
  logs?: Maybe<Array<Scalars['ID']>>
  mcc: Scalars['Int']
  mechanicalTilt: Scalars['Float']
  mnc: Scalars['Int']
  name: Scalars['String']
  ncc: Scalars['Int']
  scenario: Scenario
  sector: Scalars['String']
  site: Site
  trxNumber: Scalars['Int']
  trxPower: Scalars['Float']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
}

export enum Cell2GBand {
  DCS1800 = 'DCS1800',
  GSM900 = 'GSM900'
}

export type Cell3G = {
  __typename?: 'Cell3G'
  antenna: Antenna
  arfcn: Scalars['Int']
  azimuth: Scalars['Int']
  band: Cell3GBand
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  electricalTilt: Scalars['Float']
  height: Scalars['Float']
  id: Scalars['ID']
  ID: Scalars['String']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  lac?: Maybe<Lac>
  logs?: Maybe<Array<Scalars['ID']>>
  mechanicalTilt: Scalars['Float']
  name: Scalars['String']
  pilotPower: Scalars['Float']
  psc: Scalars['Int']
  rnc: Rnc
  scenario: Scenario
  sector: Scalars['String']
  site: Site
  totalPower: Scalars['Float']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
}

export enum Cell3GBand {
  UMTS2100 = 'UMTS2100',
  UMTS900 = 'UMTS900'
}

export type Cell4G = {
  __typename?: 'Cell4G'
  antenna: Antenna
  azimuth: Scalars['Int']
  band: Cell4GBand
  channelIndex: Scalars['Int']
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  dlBandwith: Scalars['Int']
  dlEarfcn: Scalars['Int']
  electricalTilt: Scalars['Float']
  height: Scalars['Float']
  id: Scalars['ID']
  ID: Scalars['String']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  lac?: Maybe<Lac>
  logs?: Maybe<Array<Scalars['ID']>>
  maxPower: Scalars['Float']
  mechanicalTilt: Scalars['Float']
  name: Scalars['String']
  pci: Scalars['Int']
  rsPower: Scalars['Float']
  scenario: Scenario
  sector: Scalars['String']
  site: Site
  tac: Tac
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
}

export enum Cell4GBand {
  FDD1800MHZ10 = 'FDD1800MHZ10',
  FDD1800MHZ15 = 'FDD1800MHZ15',
  FDD1800MHZ20 = 'FDD1800MHZ20'
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

export enum EntityType {
  ANTENNA = 'ANTENNA',
  BSC = 'BSC',
  CELL2G = 'CELL2G',
  CELL3G = 'CELL3G',
  CELL4G = 'CELL4G',
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

export type Lac = {
  __typename?: 'Lac'
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  ID?: Maybe<Scalars['String']>
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  logs?: Maybe<Array<Scalars['ID']>>
  name: Scalars['String']
  sites: Scalars['ID']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
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
  signinUser?: Maybe<CurrentUser>
  signoutUser: Scalars['Boolean']
}

export type MutationsigninUserArgs = {
  data: SigninUserInput
}

export type MutationsignoutUserArgs = {
  data?: Maybe<SignoutUserInput>
}

export type Parent = {
  __typename?: 'Parent'
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  ID?: Maybe<Scalars['String']>
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  logs?: Maybe<Array<Scalars['ID']>>
  name: Scalars['String']
  sites: Scalars['ID']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
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

export type PhoneNumber = {
  __typename?: 'PhoneNumber'
  cc: Scalars['String']
  dc: Scalars['String']
  sn: Scalars['String']
}

export type PhoneNumberInput = {
  cc: Scalars['String']
  dc: Scalars['String']
  sn: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  currentUser?: Maybe<CurrentUser>
  welcome: Scalars['String']
}

export enum RequestOrigin {
  MOBILE = 'MOBILE',
  WEB = 'WEB'
}

export type Rnc = {
  __typename?: 'Rnc'
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  ID?: Maybe<Scalars['String']>
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  logs?: Maybe<Array<Scalars['ID']>>
  name: Scalars['String']
  sites: Scalars['ID']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
}

export enum Scenario {
  INDOOR = 'INDOOR',
  OUTDOOR = 'OUTDOOR'
}

export type SigninUserInput = {
  agent?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  origin?: Maybe<RequestOrigin>
  password: Scalars['String']
  phone?: Maybe<PhoneNumberInput>
}

export type SignoutUserInput = {
  agent?: Maybe<Scalars['String']>
  origin?: Maybe<RequestOrigin>
}

export type Site = {
  __typename?: 'Site'
  bsc?: Maybe<Bsc>
  cells2g: Array<Scalars['ID']>
  cells3g: Array<Scalars['ID']>
  cells4g: Array<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  ID: Scalars['String']
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  lac?: Maybe<Lac>
  location: GeoLocation
  logs?: Maybe<Array<Scalars['ID']>>
  name: Scalars['String']
  rnc?: Maybe<Rnc>
  tac?: Maybe<Tac>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
}

export type Tac = {
  __typename?: 'Tac'
  createdAt?: Maybe<Scalars['DateTime']>
  createdBy?: Maybe<User>
  deactivatedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  ID?: Maybe<Scalars['String']>
  isActive: Scalars['Boolean']
  isMock?: Maybe<Scalars['Boolean']>
  logs?: Maybe<Array<Scalars['ID']>>
  name: Scalars['String']
  sites: Scalars['ID']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedBy?: Maybe<User>
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
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER'
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

export type WelcomeQueryVariables = Exact<{ [key: string]: never }>

export type WelcomeQuery = { __typename?: 'Query' } & Pick<Query, 'welcome'>

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
