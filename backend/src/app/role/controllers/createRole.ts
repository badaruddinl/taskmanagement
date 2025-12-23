import { FastifyReply, FastifyRequest } from 'fastify'
import Interceptor from '@/utils/responseInterceptor.util'
import { StatusCodes } from 'http-status-codes/build/cjs'
import { RoleService } from '../services/role'
import { CreateRolePayload } from '../dto/role'

const roleService = new RoleService()

export default async function createRoleController(
  request: FastifyRequest<{ Body: CreateRolePayload }>,
  reply: FastifyReply,
) {
  const result = await roleService.createRole(request.body)

  return Interceptor(reply, StatusCodes.CREATED, true, 'register successfully', {
    id: result.id,
    name: result.name,
  })
}
