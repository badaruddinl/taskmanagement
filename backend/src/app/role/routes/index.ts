import { FastifyInstance } from 'fastify/fastify'
import { createRoleSchema } from '../schemas'
import { createRoleController } from '../controllers'
import routeHelper from '@/utils/routeHelper.util'

export default async function roleRoutes(fastify: FastifyInstance) {
  fastify.route(
    routeHelper({
      method: 'POST',
      url: '/',
      schema: createRoleSchema,
      handler: createRoleController,
    }),
  )
}
