import Interceptor from '@/utils/responseInterceptor.util'
import { FastifyRequest, FastifyReply } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import { verifyJwt } from './secret'

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

    const decoded = await verifyJwt(token!)

    request.user = decoded
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return Interceptor(reply, StatusCodes.UNAUTHORIZED, false, 'Token expired')
    }

    if (error.name === 'JsonWebTokenError') {
      return Interceptor(reply, StatusCodes.UNAUTHORIZED, false, 'Invalid token')
    }

    return Interceptor(reply, StatusCodes.UNAUTHORIZED, false, 'Unauthorized')
  }
}
