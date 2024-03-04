module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: './'
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['prettier'],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['*.js'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true
      }
    ],
    'max-classes-per-file': 'off',
    'no-param-reassign': ['error', { props: false }],
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    'no-console': 'warn',
    'object-shorthand': 'warn',
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'node/no-missing-import': 'off',
    'arrow-body-style': ['warn', 'as-needed'],
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-useless-constructor': 'warn'
  },
  overrides: [
    {
      files: ['**/test/**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'node/no-unpublished-import': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      }
    }
  },
  env: {
    jest: true
  },
  globals: {
    page: true,
    browser: true,
    context: true
  }
};
