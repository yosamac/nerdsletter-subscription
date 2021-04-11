module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'max-len': [1, { 'code': 80 }],
    'no-whitespace-before-property': [2],
    'no-trailing-spaces': [2],
    'object-curly-spacing': [2, 'always'],
    'space-in-parens': [2, 'never'],
    'space-before-function-paren': [2, {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'no-confusing-arrow': [2],
    'prefer-arrow-callback': [2],
    'keyword-spacing': [2],
    'no-multi-spaces': [2],
    'no-await-in-loop': [2],
    'function-paren-newline': [2, 'multiline-arguments'],
    'no-console': [1],
    'no-magic-numbers': [1],
    'vars-on-top': [1],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/semi': [1],
    '@typescript-eslint/no-extra-parens': [1],
    '@typescript-eslint/no-extra-semi': [1],
    '@typescript-eslint/quotes': [2, 'single'],
    '@typescript-eslint/no-unused-vars': [1, {
      'args': 'all',
      'argsIgnorePattern': '^_'
    }]
  }
};
