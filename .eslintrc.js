module.exports = {
  extends: ['react-app', 'eslint:recommended', 'react-app/jest'],
  rules: {
    'no-extra-semi': 'off',
    'no-empty': 'off',
    'no-import-assign': 'off',
    'no-unused-vars': 'off',
    'no-restricted-globals': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
  }
};
