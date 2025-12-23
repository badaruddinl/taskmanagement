import { config } from 'dotenv'
import { JwtPayloadExtended } from './sign'
import jwt, { VerifyErrors } from 'jsonwebtoken'

config()

export const secret = process.env.JWT_SECRET as string

if (!secret) {
  throw new Error('JWT_SECRET is not defined')
}

export const verifyJwt = (token: string): Promise<JwtPayloadExtended> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err: VerifyErrors | null, decoded) => {
      if (err) {
        return reject(err)
      }

      if (!decoded || typeof decoded === 'string') {
        return reject(new Error('Invalid token payload'))
      }

      resolve(decoded as JwtPayloadExtended)
    })
  })
}
