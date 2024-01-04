import { Controller, Get, Route, SuccessResponse } from 'tsoa'

interface PingResponse {
  message: string;
}

@SuccessResponse('200', 'Connected!')
@Route('ping')
export class PingController extends Controller {
  @Get('/')
  public async getMessage(): Promise<PingResponse> {
    return {
      message: 'hello',
    }
  }
} 