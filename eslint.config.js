import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  { files: ['**/*.js'], plugins: { prettier: prettier }, rules: { 'prettier/prettier': 'error' } },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: { project: './tsconfig.json', ecmaVersion: 2021 },
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
      },
    },
    plugins: { '@typescript-eslint': typescript, prettier: prettier },
    rules: {
      ...typescript.configs.recommended.rules,
      ...prettierConfig.rules,
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unused-vars': ['error'],
      'prettier/prettier': 'error',
    },
  },
  { ignores: ['node_modules', '.DS_Store', 'src/report_*.ts', 'dist'] },
]
