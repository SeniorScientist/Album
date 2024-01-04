import { Album, AlbumDocument } from '../models/album.model'

export type AlbumCreationParams = Pick<AlbumDocument, 'title' | 'path'>

export class AlbumService {

  public async findAlbumById(id: string): Promise<AlbumDocument | null> {
    return await Album.findById(id)
  }

  public async createAlbum(albumCreationParams: AlbumCreationParams): Promise<void> {
    const album = new Album(albumCreationParams)
    await album.save()

    return
  }

  public async updateAlbum(album: AlbumDocument, albumUpdateParams: AlbumCreationParams): Promise<void> {
    album.title = albumUpdateParams.title ? albumUpdateParams.title : album.title
    album.path = albumUpdateParams.path ? albumUpdateParams.path : album.path
    await album.save()

    return
  }

  public async deleteAlbumById(id: string): Promise<void> {
    await Album.updateOne({ '_id': id }, { $set: { is_deleted: true } })

    return
  }

  public async deleteAlbumMany(albums: string[]): Promise<void> {
    await Album.updateMany({ '_id': { '$in': albums } }, { $set: { is_deleted: true } })

    return
  }
}