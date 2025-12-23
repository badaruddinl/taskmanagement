import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '../services/users'
import { FindUserByUsernamePayload } from '../dto/users'
import { StatusCodes } from 'http-status-codes'
import Interceptor from '@/utils/responseInterceptor.util'

const userService = new UserService()

export default async function findOneUserController(
  request: FastifyRequest<{ Params: FindUserByUsernamePayload }>,
  reply: FastifyReply,
) {
  const { username } = request.params
  const { id } = request.user

  let result
  if (username === 'me') {
    result = await userService.findMe({ id })
  } else if (username) {
    result = await userService.findUserByUsername({ username })
  }

  return Interceptor(reply, StatusCodes.OK, true, 'register successfully', result)
}
