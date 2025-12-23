import { FastifySchema } from 'fastify'

interface ModuleInfo {
  moduleFunction: string
  moduleDescription?: string | null
}

interface SchemaConfig {
  request?: Omit<FastifySchema, 'response'>
  response?: FastifySchema['response']
}

export const schemaBuilder = (
  { moduleFunction, moduleDescription }: ModuleInfo,
  { request, response }: SchemaConfig = {},
): FastifySchema => {
  const descContent =
    moduleDescription && moduleDescription !== '' ? moduleDescription : moduleFunction

  return {
    summary: `This API ${moduleFunction}`,
    description: `<h3>This API to ${descContent}</h3>`,

    ...request,
    ...(response ? { response } : {}),
  }
}

export const schemaBuilderModule = (
  moduleTag: string,
  moduleFunctionSchema: FastifySchema,
): FastifySchema => {
  return {
    tags: [moduleTag],
    ...moduleFunctionSchema,
  }
}
