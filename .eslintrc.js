module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'vue/max-attributes-per-line': [2, { singleline: 10, multiline: { max: 1, allowFirstLine: false } }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': 'off',
    'vue/no-v-html': 'off',
    'prettier/prettier': 'error',
    'no-unused-vars': 0,
    'no-shadow': 0,
    'prefer-rest-params': 0,
    'linebreak-style': [0, 'error', 'window'],
    'no-use-before-define': 0,
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-console': 'off',
    'no-new-object': 2,
    'no-new-require': 2,
    'no-useless-computed-key': 2,
    'no-this-before-super': 2,
  }
}
