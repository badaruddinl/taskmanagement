import { schemaBuilder } from '@/utils/schemaBuilder.util'

export const rawLoginSchema = schemaBuilder(
  { moduleFunction: 'Login User', moduleDescription: 'login user for access application' },
  {
    request: {
      security: [],
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        },
      },
    },
  },
)
