import cookie from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { CORS_OPTIONS } from '../config'
import { middleware as auth } from './middlewares/auth'

/**
 * Express application.
 */
const app = express()

// Allow or block the request
app.use(cors(CORS_OPTIONS))

// Parse cookies (res.cookies)
app.use(cookie())

// Authenticate the request (req.user)
app.use(auth)

// Respond to index
app.get('/', (_, res) => {
  res.status(200).send('Welcome to the Express server!')
})

export { app }
