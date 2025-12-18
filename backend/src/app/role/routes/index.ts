import { FastifyInstance } from 'fastify/fastify'
import routeHandler from '@/utils/routeHandler.util'
import { createRoleSchema } from '../schemas'
import { createRoleController } from '../controllers'

export default async function roleRoutes(fastify: FastifyInstance) {
  fastify.route(
    routeHandler({
      method: 'POST',
      url: '/',
      schema: createRoleSchema,
      handler: createRoleController,
    }),
  )
}
