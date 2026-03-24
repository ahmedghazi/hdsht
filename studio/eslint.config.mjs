import studio from '@sanity/eslint-config-studio'
import globals from 'globals'

export default [
  ...studio,
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
]
