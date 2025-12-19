import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '../services/users'
import { FindUserByUsernamePayload } from '../dto/users'
import { StatusCodes } from 'http-status-codes'
import Interceptor from '@/utils/responseInterceptor.util'
import { UserPayload } from '@/types/fastify'

const userService = new UserService()

export default async function findOneUserController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { username } = request.params as FindUserByUsernamePayload
    const { id } = request.user as UserPayload

    let result
    if (username === 'me') {
      result = await userService.findMe({ id })
    } else if (username) {
      result = await userService.findUserByUsername({ username })
    }

    return Interceptor(reply, StatusCodes.OK, true, 'register successfully', result)
  } catch (error: any) {
    return Interceptor(reply, StatusCodes.BAD_REQUEST, false, error.message)
  }
}
