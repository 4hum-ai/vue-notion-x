# vue-notion-x

> Fast and accurate Vue renderer for Notion. TS batteries included. ⚡️

## Features

- ⚡ **Fast** - Optimized rendering with lazy loading
- 🎨 **Flexible** - Fully customizable components and styling
- 🔍 **Search** - Built-in full-text search support
- 🗂️ **Collections** - Rich support for database views:
  - Table (with resizing)
  - Gallery
  - List
  - Board (with grouping)
- 🛠️ **Universal** - Works with Vue 3 and Nuxt 3 (SSR/SSG friendly)

## Installation

```bash
# using pnpm
pnpm add vue-notion-x notion-client notion-types notion-utils

# using npm
npm install vue-notion-x notion-client notion-types notion-utils
```

## Usage

### Basic Rendering

```vue
<script setup lang="ts">
import { NotionRenderer } from 'vue-notion-x'
import { NotionAPI } from 'notion-client'

// Fetch data on the server (e.g., in Nuxt useAsyncData or getServerSideProps)
const api = new NotionAPI()
const recordMap = await api.getPage('your-page-id')
</script>

<template>
  <NotionRenderer :record-map="recordMap" full-page class="notion-page" />
</template>

<style>
/* Import the styles */
@import 'vue-notion-x/dist/style.css';
/* Or if using the source directly */
/* @import 'vue-notion-x/src/styles.css'; */
</style>
```

### Enabling Search

To enable the search functionality, pass the `searchNotion` prop to the renderer:

```vue
<script setup lang="ts">
import { NotionRenderer } from 'vue-notion-x'

// Define your search function (server-side wrapper)
const searchNotion = async params => {
  // Call your API endpoint that wraps notion-client's search
  return await $fetch('/api/notion/search', {
    method: 'POST',
    body: params
  })
}
</script>

<template>
  <NotionRenderer
    :record-map="recordMap"
    :search-notion="searchNotion"
    full-page
  />
</template>
```

### Customizing Components

You can override any default component by passing a `components` map:

```vue
<script setup lang="ts">
import { NotionRenderer } from 'vue-notion-x'
import MyCustomLink from './MyCustomLink.vue'

const customComponents = {
  PageLink: MyCustomLink
}
</script>

<template>
  <NotionRenderer :record-map="recordMap" :components="customComponents" />
</template>
```

## Styling

`vue-notion-x` comes with a comprehensive CSS file that closely mimics Notion's default styling.

You can import it in your main CSS file or component:

```css
@import 'vue-notion-x/dist/style.css';
```

Classes are prefixed with `.notion-` to avoid conflicts. You can easily override variables for theming:

```css
:root {
  --notion-font: 'Inter', sans-serif;
  --fg-color: #333;
  --bg-color: #fff;
}
```

## Credits

This project is a Vue port of the excellent [react-notion-x](https://github.com/NotionX/react-notion-x) by [Travis Fischer](https://github.com/transitive-bullshit).
