<script setup lang="ts">
import { NotionRenderer } from 'vue-notion-x'
import { ref } from 'vue'

// Import styles
import 'vue-notion-x/styles.css'
import 'prismjs/themes/prism.css'
import 'katex/dist/katex.min.css'

const pageId = '067dd719a912471ea9a3ac10710e7fdf' // React Notion X demo page

const {
  data: recordMap,
  pending,
  error
} = await useFetch(`/api/notion/${pageId}`)
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else-if="recordMap">
    <NotionRenderer :recordMap="recordMap" fullPage />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
    'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>
