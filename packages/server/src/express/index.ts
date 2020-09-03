import cors from 'cors'
import express from 'express'
import { CORS_OPTIONS } from '../config'

/**
 * Express application.
 */
const app = express()

// Allow or block the request
app.use(cors(CORS_OPTIONS))

// Respond to index
app.get('/', (_, res) => {
  res.status(200).send('Welcome to the Express server!')
})

export { app }
