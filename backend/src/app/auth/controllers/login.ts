import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthService } from '../services/auth'
import { LoginPayload } from '../dto/auth'
import Interceptor from '@/utils/responseInterceptor.util'
import { StatusCodes } from 'http-status-codes'

export default async function loginController(request: FastifyRequest, reply: FastifyReply) {
  const authService = new AuthService()
  try {
    const body = request.body as LoginPayload
    const result = await authService.login(body)

    return Interceptor(reply, StatusCodes.OK, true, 'login successfully', result)
  } catch (error: any) {
    return Interceptor(reply, StatusCodes.BAD_REQUEST, false, error.message)
  }
}
