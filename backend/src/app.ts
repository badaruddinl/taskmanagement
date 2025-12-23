import fastify, { FastifyInstance } from 'fastify'
import { config } from 'dotenv'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { v7 as uuidv7 } from 'uuid'
import { connectDatabase } from './connections/database'
import routes from './app/routes'
import errorHandler from './errorDecorator'
import { swaggerConfig, swaggerUiConfig } from './services/swagger'
config()

export const init = async (): Promise<FastifyInstance> => {
  const app = fastify({
    genReqId: (req) => (req.headers['x-request-id'] as string) || uuidv7(),
    disableRequestLogging: false,
    logger: true,
  })

  await app.register(fastifySwagger, swaggerConfig)

  await app.register(fastifySwaggerUi, swaggerUiConfig)

  await errorHandler(app)
  await app.register(routes)

  await connectDatabase()

  return app
}

export const run = async (app: FastifyInstance) => {
  try {
    await app.listen({
      port: Number(process.env.PORT) || 3000,
      host: process.env.HOST || '0.0.0.0',
    })

    console.info(
      `Server listening at ${process.env.HOST}:${process.env.PORT}, env: ${process.env.NODE_ENV}`,
    )
    console.info(
      `Swagger UI available at http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/swagger`,
    )
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
