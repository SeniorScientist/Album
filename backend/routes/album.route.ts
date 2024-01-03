import AlbumController from '../controllers/album.controller'
import { AlbumValidator } from '../validations/album.validation'
import { Router } from 'express'

export default class AlbumRouter {
  public _albumController: AlbumController = new AlbumController()
  public _albumValidator: AlbumValidator = new AlbumValidator()

  public routes(): void {
    const router: Router = Router()
    router.route('/')
      .post(
        this._albumValidator.validateCreateAlbum,
        this._albumController.createAlbum
      )
  }
}

