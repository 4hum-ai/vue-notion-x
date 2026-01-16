import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default [
  ...vue.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/multi-word-component-names': 'off'
    }
  }
]
