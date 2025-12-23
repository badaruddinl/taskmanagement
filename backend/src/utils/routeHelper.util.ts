import {
  FastifySchema,
  HTTPMethods,
  RouteHandlerMethod,
  preHandlerHookHandler,
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
} from 'fastify'
import { authGuard } from '@/services/token/authGuard'

interface RouteHandlerInterfaces<T extends RouteGenericInterface = RouteGenericInterface> {
  method: HTTPMethods
  url: string
  schema?: FastifySchema

  handler: RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    T
  >

  preHandler?: preHandlerHookHandler | preHandlerHookHandler[]
  auth?: boolean
}

export default function routeHelper<T extends RouteGenericInterface = RouteGenericInterface>({
  method,
  url,
  schema,
  handler,
  preHandler,
  auth = true,
}: RouteHandlerInterfaces<T>) {
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
