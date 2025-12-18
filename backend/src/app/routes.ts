import { FastifyInstance } from 'fastify'
import authRoutes from './auth/routes'
import roleRoutes from './role/routes'

export default async (fastify: FastifyInstance) => {
  fastify.register(authRoutes, { prefix: '/auth' })
  fastify.register(roleRoutes, { prefix: '/roles' })
}
