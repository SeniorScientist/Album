import { Album, AlbumDocument } from '../models/album.model'

export const findAlbumById = async (id: string) => await Album.findById(id)

export const createAlbum = ({ title, path }: { title: string, path: string }) => new Album({ title, path })

export const saveAlbum = async (album: AlbumDocument) => await album.save()

export const updateAlbum = async (album: AlbumDocument, title: string, path: string) => {
  album.title = title
  album.path = path

  await album.save()
}

export const deleteAlbumById = async (id: string) => await Album.updateOne({ '_id': id }, { $set: { is_deleted: true } })

export const deleteAlbumMany = async (albums: string[]) => {
  await Album.updateMany({ '_id': { '$in': albums } }, { $set: { is_deleted: true } })
}


export default {
  findAlbumById,
  createAlbum,
  saveAlbum,
  updateAlbum,
  deleteAlbumById,
  deleteAlbumMany
}