import Interceptor from '@/utils/responseInterceptor.util'
import { FastifyRequest, FastifyReply } from 'fastify'
import { StatusCodes } from 'http-status-codes/build/cjs'
import { isTokenExpired, verifyJwt } from './secret'

export async function authGuard(request: FastifyRequest, reply: FastifyReply) {
  try {
    const auth = request.headers.authorization

    if (!auth || !auth.startsWith('Bearer ')) {
      return Interceptor(
        reply,
        StatusCodes.UNAUTHORIZED,
        false,
        'Missing or invalid Authorization header',
      )
    }
    const token = auth.split(' ')[1]
    const data = await verifyJwt(token!)
    request.user = data.decoded!
  } catch (error: any) {
    if (error.code === 'FAST_JWT_EXPIRED') {
      return Interceptor(reply, StatusCodes.UNAUTHORIZED, false, 'Token expired')
    }

    return Interceptor(reply, StatusCodes.UNAUTHORIZED, false, 'Invalid token')
  }
}
