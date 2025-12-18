module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'perfectionist', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Node / Fastify
    'no-console': 'off',
    'no-undef': 'off',

    // TypeScript
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',

    // TypeORM decorators friendly
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',

    // Import / export order
    'perfectionist/sort-named-imports': ['warn', { order: 'asc', type: 'line-length' }],
    'perfectionist/sort-exports': ['warn', { order: 'asc', type: 'line-length' }],
  },
}
