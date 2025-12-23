import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthService } from '../services/auth'
import { RegisterPayload } from '../dto/auth'
import Interceptor from '@/utils/responseInterceptor.util'
import { StatusCodes } from 'http-status-codes'
import requestHelper from '@/utils/requestHelper.util'

const authService = new AuthService()

export default async function registerController(
  request: FastifyRequest<{ Body: RegisterPayload }>,
  reply: FastifyReply,
) {
  try {
    const result = await authService.register(request.body)
    return Interceptor(reply, StatusCodes.CREATED, true, 'register successfully', {
      id: result.id,
      username: result.username,
    })
  } catch (error: any) {
    return Interceptor(reply, StatusCodes.BAD_REQUEST, false, error.message)
  }
}
