import cookie from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { CORS_OPTIONS } from '../config'
import { middleware as auth } from './middlewares/auth'
import { middleware as i18n } from './middlewares/i18n'

/**
 * Express application.
 */
const app = express()

// Allow or block the request
app.use(cors(CORS_OPTIONS))

// Parse cookies (res.cookies)
app.use(cookie())

// Use i18n
app.use(i18n)

// Authenticate the request (req.user)
app.use(auth)

// Respond to index
app.get('/', (_, res) => {
  res.status(200).send('Welcome to the Express server!')
})

export { app }
