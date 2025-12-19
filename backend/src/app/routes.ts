import { FastifyInstance } from 'fastify'
import authRoutes from './auth/routes'
import roleRoutes from './role/routes'
import usersRoutes from './users/routes'

export default async (fastify: FastifyInstance) => {
  fastify.register(authRoutes, { prefix: '/auth' })
  fastify.register(roleRoutes, { prefix: '/roles' })
  fastify.register(usersRoutes, { prefix: '/users' })
}
