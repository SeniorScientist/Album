import { Code } from '../types/http.type'

export default class JSONResponse {
  constructor() { }

  static success(message: string, data?: any) {
    return {
      code: 200,
      message: message || 'success',
      data: data
    }
  }

  static error(code: Code, message: string) {
    return {
      code: code,
      message: message || 'client error'
    }
  }

  static serverError(message: string) {
    return {
      code: Code.INTERNAL_SERVER_ERROR,
      message: message || 'server error'
    }
  }
}