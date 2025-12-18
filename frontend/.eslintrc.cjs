module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  rules: {
    // preferensi pribadi
    'react/react-in-jsx-scope': 'off', // Next.js
    'no-console': 'warn',
  },
}
