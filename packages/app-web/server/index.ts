import { config } from 'dotenv'
import express from 'express'
import next from 'next'

// Load and set environment variables
config()
const port = Number(process.env.CLIENT_PORT) || 5000
const dev = process.env.NODE_ENV !== 'production'

// Initialize the express server
const app = next({ dev })
const handle = app.getRequestHandler()

// Run the Next.js server
app.prepare().then(() => {
  const server = express()

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server
    .listen(port, () => {
      console.info(`Server is running at http://localhost:${port}`)
    })
    .on('error', error => {
      throw error
    })
})
