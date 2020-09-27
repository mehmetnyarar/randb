import * as Linking from 'expo-linking'

const prefix = Linking.makeUrl('/')

export const linking = { prefixes: [prefix] }
