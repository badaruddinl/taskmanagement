import { FastifyReply, FastifyRequest } from 'fastify'
import Interceptor from '@/utils/responseInterceptor.util'
import { StatusCodes } from 'http-status-codes/build/cjs'
import { RoleService } from '../services/role'
import { CreateRolePayload } from '../dto/role'

const roleService = new RoleService()

export default async function createRoleController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as CreateRolePayload
    const result = await roleService.createRole(body)

    return Interceptor(reply, StatusCodes.CREATED, true, 'register successfully', {
      id: result.id,
      name: result.name,
    })
  } catch (error: any) {
    return Interceptor(reply, StatusCodes.BAD_REQUEST, false, error.message)
  }
}
