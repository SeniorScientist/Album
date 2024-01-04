import cors from 'cors'
import express from 'express'

export function initCORS(app: express.Application) {
  app.use(
    cors({
      origin: `http://${process.env.HOST}`,
      methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
      optionsSuccessStatus: 204,
      credentials: true
    })
  )
}
