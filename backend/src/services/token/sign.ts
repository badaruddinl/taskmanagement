import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from 'dotenv'
import { secret } from './secret'

config()

export interface JwtPayloadExtended extends JwtPayload {
  id: string
  username: string
  role: string
  exp?: number
  iss?: string
}

export function signAccessToken(payload: JwtPayloadExtended) {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '24h',
  })
}
