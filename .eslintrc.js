module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-typescript',
    'react-app',
    'react-app/jest',
  ],
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest',
  ],
  root: true,
  rules: {
    'import/prefer-default-export': 'off',
    'arrow-body-style': 'off',
    'react/static-property-placement': ['error', 'static public field'],
  },
};
