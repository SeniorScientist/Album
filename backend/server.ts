import express from 'express'
import router from './routes/index'
import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
import winston from 'winston'
import { initCORS } from '@startups/cors'
import { initDB } from '@startups/db'
import { initProd } from '@startups/prod'
import { initRateLimit } from '@startups/rate-limit'
dotenv.config()

const port = process.env.PORT || 8081

class App {
  public express
  constructor() {
    this.express = express()
    this.express.use(bodyParser.json({ limit: '50mb' }))
    this.express.use(bodyParser.urlencoded({ extended: false }))
    this.loadRoutes()
    initCORS(this.express)
    initDB()
    initProd(this.express)
    initRateLimit(this.express)

    this.express.listen(port, () => winston.info(`Listening on port ${port}...`))
  }

  private loadRoutes(): void {
    this.express.use('/', router)
  }
}

export default new App().express