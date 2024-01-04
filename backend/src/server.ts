import express, { Request as ExRequest, Response as ExResponse, NextFunction } from 'express'
import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
import winston from 'winston'
import { initCORS } from './startups/cors'
import { initDB } from './startups/db'
import { initProd } from './startups/prod'
import { initRateLimit } from './startups/rate-limit'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from '../build/routes'
import { ValidateError } from 'tsoa'

dotenv.config()

const port = process.env.PORT || 8081

class App {
  public app: express.Application

  constructor() {
    this.app = express()

    RegisterRoutes(this.app)
    this.config()
    this.app.listen(port, () => winston.info(`Listening on port ${port}...`))
  }

  private config(): void {
    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(morgan('tiny'))

    initCORS(this.app)
    initDB()
    initProd(this.app)
    initRateLimit(this.app)

    this.app.use(
      ['/docs', '/openai', '/swagger'],
      swaggerUi.serve,
      async (_req: ExRequest, res: ExResponse) => {
        return res.send(
          swaggerUi.generateHTML(await import('../build/swagger.json'))
        )
      }
    )

    this.app.use(function errorHandler(
      err: unknown,
      req: ExRequest,
      res: ExResponse,
      next: NextFunction
    ): ExResponse | void {
      if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
        return res.status(422).json({
          message: 'Validation Failed',
          details: err?.fields,
        })
      }
      if (err instanceof Error) {
        return res.status(500).json({
          message: err?.message || 'Internal Server Error'
        })
      }

      next()
    })

    this.app.use(function notFoundHandler(_req, res: ExResponse) {
      return res.status(404).send({
        message: 'Not Found'
      })
    })
  }

}

export default new App().app