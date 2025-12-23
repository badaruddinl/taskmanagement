import { schemaBuilder } from '@/utils/schemaBuilder.util'

export const rawRegisterSchema = schemaBuilder(
  {
    moduleFunction: 'Register User',
    moduleDescription: 'create a new user account',
  },
  {
    request: {
      security: [],
      body: {
        type: 'object',
        required: ['name', 'username', 'password'],
        properties: {
          name: { type: 'string' },
          username: { type: 'string' },
          password: { type: 'string' },
        },
      },
    },
  },
)
