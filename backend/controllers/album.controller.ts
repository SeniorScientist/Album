import { Request, Response } from 'express'
import JSONResponse from '../middlewares/response.middleware'
import albumService from '../services/album.service'
import AlbumService from '../services/album.service'
import sanitize from 'mongo-sanitize'
import { ErrorCode } from '../types/error.type'

export default class AlbumController {
  public constructor() { }

  public async createAlbum(req: Request, res: Response) {
    const sanitizedInput = sanitize<{ title: string; path: string; }>(req.body)

    try {
      const newAlbum = await AlbumService.createAlbum(sanitizedInput)

      await AlbumService.saveAlbum(newAlbum)

      return JSONResponse.success(res, 'Album was newly created.')
    } catch (error: any) {
      return JSONResponse.serverError(res, error.message)
    }
  }

  public async updateAlbum(req: Request, res: Response) {
    const sanitizedInput = sanitize<{ title: string; path: string; }>(req.body)

    try {
      const id = req.params.id

      const album = await albumService.findAlbumById(id)

      if (!album) {
        return JSONResponse.error(res, ErrorCode.BAD_REQUEST, 'Not existing album')
      }

      await AlbumService.updateAlbum(album, sanitizedInput.title, sanitizedInput.path)

      return JSONResponse.success(res, 'Album was updated.')
    } catch (error: any) {
      return JSONResponse.serverError(res, error.message)
    }
  }

  public async readAlbum(req: Request, res: Response) {

  }

  public async deleteAlbumMany(req: Request, res: Response) {
    const sanitizedInput = sanitize<{ ids: string[] }>(req.body)

    try {
      await albumService.deleteAlbumMany(sanitizedInput.ids)

      return JSONResponse.success(res, 'Albums were deleted.')
    } catch (error: any) {
      return JSONResponse.serverError(res, error.message)
    }
  }

  public async deleteAlbum(req: Request, res: Response) {
    const id = req.params.id

    try {
      const album = await albumService.findAlbumById(id)

      if (!album) {
        return JSONResponse.error(res, ErrorCode.BAD_REQUEST, 'Not existing album.')
      }

      await albumService.deleteAlbumById(id)

      return JSONResponse.success(res, 'Album was deleted.')
    } catch (error: any) {
      return JSONResponse.serverError(res, error.message)
    }
  }
}