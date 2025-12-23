import { schemaBuilder } from '@/utils/schemaBuilder.util'

export const rawFindOneUserSchema = schemaBuilder(
  { moduleFunction: 'Find one user', moduleDescription: 'find user one by username' },
  {
    request: {
      params: {
        type: 'object',
        properties: {
          username: { type: 'string' },
        },
        required: ['username'],
      },
    },
  },
)
