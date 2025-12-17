import fastify, { FastifyInstance } from "fastify"; 
import { config } from "dotenv";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { v7 as uuidv7 } from "uuid"; 
import { connectDatabase } from "./connections/database";
import routes from "./app/routes";
import jwt from  "@/services/token/secret"

config();

const servers = [
  {
    url: `http://${process.env.HOST ?? 'localhost'}:${process.env.PORT ?? 3000}`,
    description: 'Local Development Server'
  }
];

const swaggerConfig = {
  openapi: {
    info: {
      title: "Task Management API",
      description: "API documentation for Task Management",
      version: "1.0.0",
    },
    servers: servers,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http" as const,
          scheme: "bearer" as const,
          bearerFormat: "JWT",
          description: "Enter your JWT token here",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
};

const swaggerUiConfig = {
  routePrefix: "/swagger",
  uiConfig: {
    docExpansion: "none" as const, 
    deepLinking: true,
    persistAuthorization: true, 
  },
  staticCSP: true,
  transformStaticCSP: (header: string) => header,
};

export const init = async (): Promise<FastifyInstance> => {
  const app = fastify({
    genReqId: (req) => (req.headers["x-request-id"] as string) || uuidv7(),
    disableRequestLogging: false,
    logger: true
  });

  await app.register(fastifySwagger, swaggerConfig);

  await app.register(fastifySwaggerUi, swaggerUiConfig);

  await app.register(jwt)

  await app.register(routes)

  await connectDatabase()

  return app;
};

export const run = async (app: FastifyInstance) => {
  try {
    await app.listen({
      port: Number(process.env.PORT) || 3000,
      host: process.env.HOST || '0.0.0.0'
    });

    console.info(
      `Server listening at ${process.env.HOST}:${process.env.PORT}, env: ${process.env.NODE_ENV}`
    );
    console.info(
      `Swagger UI available at http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/swagger`
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};