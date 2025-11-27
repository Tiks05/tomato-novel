/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // 即使现在写 JS 也没问题，以后用 TS 直接生效
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect', // 自动检测 React 版本
    },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // 一定要放在最后，让 Prettier 接管格式化相关规则
  ],
  rules: {
    // React 17+ 不需要每个文件都 import React
    'react/react-in-jsx-scope': 'off',
    // 你可以在这里按需加自定义规则
  },
}
