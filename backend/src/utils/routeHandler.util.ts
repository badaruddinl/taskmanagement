import { 
  FastifySchema, 
  RouteHandlerMethod, 
  HTTPMethods, 
  RouteOptions 
} from 'fastify';

interface RouteHandlerInterfaces {
  method: HTTPMethods;
  url: string;
  schema?: FastifySchema;
  handler: RouteHandlerMethod;
}

export default function routeHandler({
  method,
  url,
  schema,
  handler
}: RouteHandlerInterfaces): RouteOptions {
  return {
    method,
    url,
    ...(schema && { schema }), 
    preHandler: [],
    handler
  };
}