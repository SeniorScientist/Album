import Joi from 'joi'
import { AlbumDocument } from '@models/album.model'
import { SearchDocument } from '@models/search.model'

export function validateCreateAlbum(
  input: Pick<AlbumDocument, 'title' | 'path'>
) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    path: Joi.string().max(255).required()
  })

  return schema.validate(input)
}

export function validateReadAlbum(
  input: Pick<SearchDocument, 'page' | 'sortBy' | 'order' | 'pageSize'>
) {
  const schema = Joi.object({
    page: Joi.number().min(1),
    pageSize: Joi.number().min(12),
    sortBy: Joi.string().min(1),
    order: Joi.string().length(3)
  })

  return schema.validate(input)
}

export function validateUpdateAlbum(
  input: Pick<AlbumDocument, 'title' | 'path' | '_id'>
) {
  const schema = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().min(2).max(50),
    path: Joi.string().max(255)
  })

  return schema.validate(input)
}

export function validateDeleteAlbum(
  input: any
) {
  const schema = Joi.object({
    ids: Joi.array().required()
  })

  return schema.validate(input)
}