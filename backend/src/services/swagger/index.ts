const servers = [
  {
    url: `http://${process.env.HOST === '0.0.0.0' ? 'localhost' : process.env.HOST}:${process.env.PORT ?? 3000}`,
    description: 'Local Development Server',
  },
]

export const swaggerConfig = {
  openapi: {
    info: {
      title: 'Task Management API',
      description: 'API documentation for Task Management',
      version: '1.0.0',
    },
    servers: servers,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http' as const,
          scheme: 'bearer' as const,
          bearerFormat: 'JWT',
          description: 'Enter your JWT token here',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
}

export const swaggerUiConfig = {
  routePrefix: '/swagger',
  uiConfig: {
    docExpansion: 'none' as const,
    deepLinking: true,
    persistAuthorization: true,
  },
  staticCSP: true,
  transformStaticCSP: (header: string) => header,
}
