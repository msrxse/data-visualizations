import { default as eruptionESLintConfig } from '@eruptionjs/config/eslint'

export default [
  ...eruptionESLintConfig,
  {
    rules: {
      'import/group-exports': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
]
