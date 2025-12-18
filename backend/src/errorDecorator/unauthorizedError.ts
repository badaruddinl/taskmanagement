import createError from '@fastify/error'

export const UnauthorizedError = createError(
  'AUTH_UNAUTHORIZED',
  'Username or Password incorrect',
  401,
)
