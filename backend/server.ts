import express from 'express'
import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
import winston from 'winston'
import { initCORS } from './startups/cors'
import { initDB } from './startups/db'
import { initProd } from './startups/prod'
import { initRateLimit } from './startups/rate-limit'
import { Routes } from './routes'

dotenv.config()

const port = process.env.PORT || 8081

class App {
  public app: express.Application
  public router: Routes

  constructor() {
    this.app = express()
    this.router = new Routes()

    this.config()
    this.loadRoutes()

    this.app.listen(port, () => winston.info(`Listening on port ${port}...`))
  }

  private config(): void {
    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ extended: false }))
    initCORS(this.app)
    initDB()
    initProd(this.app)
    initRateLimit(this.app)
  }

  private loadRoutes(): void {
    this.router.routes(this.app)
  }
}

export default new App().app