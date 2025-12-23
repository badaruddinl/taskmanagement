import 'fastify'

interface UserPayload {
  id: string
  username: string
  role: string
}

declare module 'fastify' {
  interface FastifyRequest {
    user: UserPayload
  }
  interface FastifyReply {
    statusCode: number
    success: boolean
    message: string | object
    data?: any
    errors?: any
  }
}
