import createError from '@fastify/error'
import { StatusCodes } from 'http-status-codes'

const BaseNotFoundError = createError('RESOURCE_NOT_FOUND', '%s', StatusCodes.NOT_FOUND)
const BaseUnautorizedError = createError('AUTH_UNAUTHORIZED', '%s', StatusCodes.UNAUTHORIZED)
const BaseBaqRequestError = createError('BAD_REQUEST', '%s', StatusCodes.BAD_REQUEST)

export class NotFoundError extends BaseNotFoundError {
  constructor(message?: string) {
    super(message || 'Resource not found')
  }
}

export class UnauthorizedError extends BaseUnautorizedError {
  constructor(message?: string) {
    super(message || 'Username or Password incorrect')
  }
}

export class BaqRequestError extends BaseBaqRequestError {
  constructor(message?: string) {
    super(message || 'Already exists')
  }
}
