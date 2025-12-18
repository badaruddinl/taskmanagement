import { config } from 'dotenv'
import { JwtPayloadExtended } from './sign'
import jwt from 'jsonwebtoken'

config()

export const secret = process.env.JWT_SECRET as string

if (!secret) {
  throw new Error('JWT_SECRET is not defined')
}

export const isTokenExpired = (decoded: JwtPayloadExtended): boolean => {
  const expirationTime = decoded.exp
  if (typeof expirationTime !== 'undefined') {
    const currentTimestamp = Math.floor(Date.now() / 1000)
    return expirationTime < currentTimestamp
  }
  return true
}

export const isJwtFormatValid = async (token: string): Promise<boolean> => {
  const parts = token.split('.')

  if (parts.length !== 3) {
    return false
  }

  const [header, payload] = parts

  if (!header || !payload) {
    return false
  }

  try {
    Buffer.from(header, 'base64').toString('utf8')
    Buffer.from(payload, 'base64').toString('utf8')
  } catch (error) {
    return false
  }

  return true
}

export const verifyJwt = async (
  token: string,
): Promise<{ status: boolean; decoded: JwtPayloadExtended | null }> => {
  try {
    if (await isJwtFormatValid(token)) {
      const decoded = jwt.verify(token, secret) as JwtPayloadExtended

      if (!isTokenExpired(decoded)) {
        return {
          status: true,
          decoded,
        }
      }
    }

    return {
      status: false,
      decoded: null,
    }
  } catch (error) {
    console.error('Token verification failed:', error)
    return {
      status: false,
      decoded: null,
    }
  }
}
