import { ErrorCode } from '../types/error.type'
import { Response } from 'express'

export default class JSONResponse {
  constructor() { }

  static success(res: Response, message: string, data?: any) {
    res.status(200).json({
      code: 200,
      message: message || 'success',
      data: data
    })
  }

  static error(res: Response, code: ErrorCode, message: string) {
    res.status(code).json({
      code: code,
      message: message || 'client error',
    })
  }

  static serverError(res: Response, message: string) {
    res.status(500).json({
      code: 500,
      message: message || 'server error'
    })
  }
}