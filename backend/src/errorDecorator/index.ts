import Interceptor from '@/utils/responseInterceptor.util'
import { FastifyInstance } from 'fastify'
import { StatusCodes } from 'http-status-codes'

export default async (app: FastifyInstance) => {
  app.setErrorHandler((error: any, request, reply) => {
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

    // Business error
    if (error.statusCode) {
      return Interceptor(reply, error.statusCode, false, error.message)
    }

    // Unknown error
    request.log.error(error)

    return Interceptor(reply, StatusCodes.INTERNAL_SERVER_ERROR, false, 'Internal server error')
  })
}
