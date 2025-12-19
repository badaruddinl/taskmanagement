import { FastifyInstance } from 'fastify/fastify'

import { findOneUserController } from '../controllers'
import routeHelper from '@/utils/routeHelper.util'
import { findOneUserSchema } from '../schemas'

export default async function usersRoutes(fastify: FastifyInstance) {
  fastify.route(
    routeHelper({
      method: 'GET',
      url: '/:username',
      schema: findOneUserSchema,
      handler: findOneUserController,
    }),
  )
}
