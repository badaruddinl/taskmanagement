import { FastifyInstance } from 'fastify/fastify'
import routeHandler from '@/utils/routeHandler.util'
import { loginController, registerController } from '../controllers'
import { loginSchema, registerSchema } from '../schemas'

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.route(
    routeHandler({
      method: 'POST',
      url: '/',
      schema: loginSchema,
      handler: loginController,
      auth: false,
    }),
  )

  fastify.route(
    routeHandler({
      method: 'POST',
      url: '/register',
      schema: registerSchema,
      handler: registerController,
      auth: false,
    }),
  )
}
