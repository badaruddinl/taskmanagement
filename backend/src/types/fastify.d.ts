import 'fastify'

interface UserPayload {
  id: string
  username: string
  role: string
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: UserPayload
  }
}
