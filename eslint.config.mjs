import fiskerEslintConfig from '@fisker/eslint-config'

export default [
  ...fiskerEslintConfig,
  {ignores: ['index.js', 'posix.js', 'windows.js']},
]
