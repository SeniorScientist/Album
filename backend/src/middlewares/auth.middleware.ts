import { Request, Response, NextFunction } from 'express'
import JSONResponse from './response.middleware'
import { Code } from 'src/types/http.type'
import admin from '../../firebase'

export default function (req: Request, res: Response, next: NextFunction) {
  const idToken = req.headers?.authorization
  console.log('idtoken', idToken)
  if (!idToken) {
    return JSONResponse.error(Code.UNAUTHORIZED, 'Auth token was missed')
  }

  // idToken comes from the client app
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid
      console.log('decoded uid', uid)
      next()
    })
    .catch((error: any) => {
      console.log('decode error', error)
      return JSONResponse.error(Code.UNAUTHORIZED, 'Auth token was unaauthorized.')
    })

}