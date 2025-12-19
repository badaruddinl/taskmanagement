export const findOneUserSchema = {
  params: {
    type: 'object',
    properties: {
      username: { type: 'string' },
    },
    required: ['username'],
  },
}
