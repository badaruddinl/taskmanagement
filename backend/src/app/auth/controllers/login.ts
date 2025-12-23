import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthService } from '../services/auth'
import { LoginPayload } from '../dto/auth'
import Interceptor from '@/utils/responseInterceptor.util'
import { StatusCodes } from 'http-status-codes'

export default async function loginController(
  request: FastifyRequest<{ Body: LoginPayload }>,
  reply: FastifyReply,
) {
  const authService = new AuthService()

  const result = await authService.login(request.body)

  return Interceptor(reply, StatusCodes.OK, true, 'login successfully', result)
}
