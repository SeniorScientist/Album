import * as mongoose from 'mongoose'

import constants from './constants'
import { Logger } from './Logger'
import { provideSingleton } from '../ioc'

mongoose.set('debug', Logger.shouldLog)

@provideSingleton(MongoDBConnection)
export class MongoDBConnection {
  public db: mongoose.Connection
  private readonly connectionString: string = constants.mongoConnectionString

  constructor() {
    Logger.log(`connecting to ${constants.environment} MongoDb`)
    this.db = mongoose.createConnection(this.connectionString)
  }
}