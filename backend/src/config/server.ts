import express, { Request, Response } from 'express'
import * as swaggerUi from 'swagger-ui-express'
import constants from './constants'
import bodyParser from 'body-parser'
import { Logger } from './Logger'
import morgan from 'morgan'
import { ErrorHandler } from './ErrorHandler'
import { iocContainer } from 'src/ioc'


export class Server {
  public app: express.Express = express()
  private readonly port: number = constants.port

  constructor() {
    this.app.use(this.allowCors)
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    this.app.use(morgan('dev', { skip: () => !Logger.shouldLog }))
    RegisterRoutes(this.app)
    this.app.use(ErrorHandler.handleError)

    this.app.use(
      ['/api-docs', '/openai', '/swagger'],
      swaggerUi.serve,
      async (_req: Request, res: Response) => {
        return res.send(
          swaggerUi.generateHTML(await import('../../build/swagger.json'))
        )
      }
    )
  }

  public async listen(port: number = this.port) {
    process.on('uncaughtException', this.criticalErrorHandler)
    process.on('unhandledRejection', this.criticalErrorHandler)
    const listen = this.app.listen(port)
    Logger.info(`${constants.environment} server running on port: ${this.port}`)
    return listen
  }

  private criticalErrorHandler(...args: any[]) {
    Logger.error('Critical Error...', ...args)
    process.exit(1)
  }

  private allowCors(req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey, x-access-token'
    )
    next()
  }
}