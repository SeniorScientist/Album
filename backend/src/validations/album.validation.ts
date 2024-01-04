import Joi from 'joi'
import { SearchDocument } from '../models/search.model'
import { Request, Response, NextFunction } from 'express'
import JSONResponse from '../middlewares/response.middleware'
import { Code } from '../types/http.type'

export class AlbumValidator {

  public validateCreateAlbum = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, path } = req.body

      Joi.object({
        title: Joi.string().min(2).max(50).required(),
        path: Joi.string().max(255).required()
      }).validateAsync({ title, path })

      next()
    } catch (err: any) {
      JSONResponse.error(res, Code.BAD_REQUEST, err.message)
    }
  }

  public validateUpdateAlbum = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, path } = req.body
      const { id } = req.params

      Joi.object({
        id: Joi.string()
          .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/)
          .required()
          .messages({ 'string.pattern.base': '"id" fails to match the required format' }),
        title: Joi.string().min(2).max(50),
        path: Joi.string().max(255)
      }).validateAsync({ id, title, path })

      next()
    } catch (err: any) {
      JSONResponse.error(res, Code.BAD_REQUEST, err.message)
    }
  }

  public validateDeleteAlbum = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { ids } = req.body

      Joi.object({
        ids: Joi.array().required()
      }).validateAsync({ ids })

      next()
    } catch (err: any) {
      JSONResponse.error(res, Code.BAD_REQUEST, err.message)
    }
  }
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