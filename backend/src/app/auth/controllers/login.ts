import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthService } from '../services/auth'
import { LoginPayload } from '../dto/auth'
import Interceptor from '@/utils/responseInterceptor.util'
import { StatusCodes } from 'http-status-codes'
import requestHelper from '@/utils/requestHelper.util'

export default async function loginController(
  request: FastifyRequest<{ Body: LoginPayload }>,
  reply: FastifyReply,
) {
  const authService = new AuthService()
  try {
    const result = await authService.login(request.body)

    return Interceptor(reply, StatusCodes.OK, true, 'login successfully', result)
  } catch (error: any) {
    return Interceptor(reply, StatusCodes.BAD_REQUEST, false, error.message)
  }
}
