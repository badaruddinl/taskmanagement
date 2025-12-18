import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthService } from '../services/auth'
import { LoginPayload, RegisterPayload } from '../dto/auth'
import Interceptor from '@/utils/responseInterceptor.util'
import { StatusCodes } from 'http-status-codes'

export default async function loginController(request: FastifyRequest, reply: FastifyReply) {
  const authService = new AuthService(request.server)
  try {
    const body = request.body as LoginPayload
    const result = await authService.login(body)

    return Interceptor(reply, StatusCodes.OK, true, 'login successfully', result)
  } catch (error: any) {
    return Interceptor(reply, StatusCodes.BAD_REQUEST, false, error.message)
  }
}
