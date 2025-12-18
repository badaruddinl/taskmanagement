import Interceptor from '@/utils/responseInterceptor.util'
import { FastifyInstance } from 'fastify'
import { StatusCodes } from 'http-status-codes'

export default async (app: FastifyInstance) => {
  app.setErrorHandler((error: any, request, reply) => {
    // JWT expired
    if (error.code === 'FAST_JWT_EXPIRED') {
      return Interceptor(reply, StatusCodes.UNAUTHORIZED, false, 'Token expired')
    }

    // JWT invalid
    if (error.code === 'FAST_JWT_INVALID') {
      return Interceptor(reply, StatusCodes.UNAUTHORIZED, false, 'Invalid token')
    }

    // Schema validation
    if (error.validation) {
      return Interceptor(
        reply,
        StatusCodes.BAD_REQUEST,
        false,
        'Validation error',
        null,
        error.validation,
      )
    }

    if (typeof error.statusCode === 'number') {
      return Interceptor(reply, error.statusCode, false, error.message)
    }

    // Business error
    if (error.statusCode) {
      return Interceptor(reply, error.statusCode, false, error.message)
    }

    // Unknown error
    request.log.error(error)

    return Interceptor(reply, StatusCodes.INTERNAL_SERVER_ERROR, false, 'Internal server error')
  })
}
