import { AlbumCreationParams, AlbumService } from '../services/album.service'
import { Code } from '../types/http.type'
// import { Body, Controller, Post, Query, Res, Route, SuccessResponse, TsoaResponse } from 'tsoa'
import { Body, Controller, Inject, Post, Route, SuccessResponse, } from 'tsoa'

@Route('album')
export class AlbumController extends Controller {

  constructor(@Inject(AlbumService) private albumService: AlbumService) {
    super()
  }

  @Post()
  @SuccessResponse(Code.SUCCESS, 'Created')
  public async createAlbum(
    @Body() requestBody: AlbumCreationParams
  ): Promise<void> {

    try {
      this.albumService.createAlbum(requestBody)
      this.setStatus(200)

      return
    } catch (error: any) {
      this.setStatus(Code.INTERNAL_SERVER_ERROR)
      return
    }
  }

  // @Post()
  // @SuccessResponse(Code.SUCCESS, 'Updated')
  // public async updateAlbum(
  //   @Body() requestBody: AlbumCreationParams,
  //   @Query() currentId: string,
  //   @Res() notFoundResponse: TsoaResponse<Code.NOT_FOUND, { message: string }>
  // ): Promise<void> {
  //   try {
  //     const album = new AlbumService().findAlbumById(currentId)
  //     if (!album) {
  //       return notFoundResponse(Code.NOT_FOUND, { message: 'Please provide the valid id of the album to be updated.' })
  //     }

  //     return new AlbumService().updateAlbum(album, requestBody)

  //   } catch (error: any) {
  //     this.setStatus(Code.INTERNAL_SERVER_ERROR)
  //     return
  //   }
  // }

  // public async updateAlbum(req: Request, res: Response) {
  //   const sanitizedInput = sanitize<{ title: string; path: string; }>(req.body)

  //   try {
  //     const id = req.params.id

  //     const album = await albumService.findAlbumById(id)

  //     if (!album) {
  //       return JSONResponse.error(res, ErrorCode.BAD_REQUEST, 'Not existing album')
  //     }

  //     await AlbumService.updateAlbum(album, sanitizedInput.title, sanitizedInput.path)

  //     return JSONResponse.success(res, 'Album was updated.')
  //   } catch (error: any) {
  //     return JSONResponse.serverError(res, error.message)
  //   }
  // }

  // public async readAlbum(req: Request, res: Response) {

  // }

  // public async deleteAlbumMany(req: Request, res: Response) {
  //   const sanitizedInput = sanitize<{ ids: string[] }>(req.body)

  //   try {
  //     await albumService.deleteAlbumMany(sanitizedInput.ids)

  //     return JSONResponse.success(res, 'Albums were deleted.')
  //   } catch (error: any) {
  //     return JSONResponse.serverError(res, error.message)
  //   }
  // }

  // public async deleteAlbum(req: Request, res: Response) {
  //   const id = req.params.id

  //   try {
  //     const album = await albumService.findAlbumById(id)

  //     if (!album) {
  //       return JSONResponse.error(res, ErrorCode.BAD_REQUEST, 'Not existing album.')
  //     }

  //     await albumService.deleteAlbumById(id)

  //     return JSONResponse.success(res, 'Album was deleted.')
  //   } catch (error: any) {
  //     return JSONResponse.serverError(res, error.message)
  //   }
  // }
}