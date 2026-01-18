import { resolve } from 'path'

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  alias: {
    // Fix for node packages in browser
    '@4hum-ai/notion-client': resolve(
      __dirname,
      '../../packages/notion-client/build/index.js'
    )
  },
  typescript: {
    strict: true
  },
  build: {
    transpile: ['@4hum-ai/vue-notion-x', 'katex']
  }
})
