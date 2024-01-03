import AlbumRouter from './album.route'
import express from 'express'

export class Routes {
  public _albumRouter: AlbumRouter = new AlbumRouter()

  public routes(app: express.Application): void {
    app.use('/api/v1/album/', this._albumRouter.routes)
  }
}