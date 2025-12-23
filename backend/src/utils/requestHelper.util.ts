import { FastifyRequest } from 'fastify'

type RequestSource = 'body' | 'query' | 'params' | 'user'

export default function requestHelper<T>(request: FastifyRequest, source: RequestSource): T {
  return (request[source] || {}) as T
}
