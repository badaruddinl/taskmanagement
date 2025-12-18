export const registerSchema = {
  body: {
    type: 'object',
    required: ['name', 'username', 'password'],
    properties: {
      name: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
    },
  },
}
