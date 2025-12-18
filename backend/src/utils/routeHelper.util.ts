import { FastifySchema, HTTPMethods, RouteHandlerMethod, preHandlerHookHandler } from 'fastify'
import { authGuard } from '@/services/token/authGuard'

interface RouteHandlerInterfaces {
  method: HTTPMethods
  url: string
  schema?: FastifySchema
  handler: RouteHandlerMethod
  preHandler?: preHandlerHookHandler | preHandlerHookHandler[]
  auth?: boolean
}

export default function routeHelper({
  method,
  url,
  schema,
  handler,
  preHandler,
  auth = true,
}: RouteHandlerInterfaces) {
  const preHandlers: preHandlerHookHandler[] = [
    ...(auth ? [authGuard] : []),
    ...(Array.isArray(preHandler) ? preHandler : preHandler ? [preHandler] : []),
  ]

  return {
    method,
    url,
    ...(schema ? { schema } : {}),
    ...(preHandlers.length ? { preHandler: preHandlers } : {}),
    handler,
  }
}
