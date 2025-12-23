import { schemaBuilder } from '@/utils/schemaBuilder.util'

export const rawCreateRoleSchema = schemaBuilder(
  { moduleFunction: 'Create Role', moduleDescription: 'create new role' },
  {
    request: {
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
        },
      },
    },
  },
)
