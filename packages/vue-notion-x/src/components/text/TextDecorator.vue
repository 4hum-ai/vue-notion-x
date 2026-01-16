<script setup lang="ts">
import { computed, h } from 'vue'
import type { Decoration } from 'notion-types'
import { isBrowser } from '../../utils'

const props = defineProps<{
  content: Decoration
}>()

const text = computed(() => props.content[0])
const decorators = computed(() => props.content[1] || [])

// Logic render decorators recursive or nested
// In Vue template, simpler to use render function or basic checks for simple decoration
// For complex nesting, render function is better.
// But Notion decorations are array of modifiers.

const formattedElement = computed(() => {
  const t = text.value
  const d = decorators.value

  if (!d?.length) return t

  let element: any = t

  for (const decoration of d) {
    const type = decoration[0]
    switch (type) {
      case 'b':
        element = h('b', null, element)
        break
      case 'i':
        element = h('i', null, element)
        break
      case 's':
        element = h('s', null, element)
        break
      case 'a':
        const url = decoration[1]
        // TODO: Handle internal links using mapPageUrl
        element = h(
          'a',
          {
            class: 'notion-link',
            href: url,
            target: '_blank',
            rel: 'noopener noreferrer'
          },
          element
        )
        break
      case 'c': // inline code
        element = h('code', { class: 'notion-inline-code' }, element)
        break
      case '_': // underline
        element = h('span', { class: 'notion-inline-underscore' }, element)
        break
      case 'h': // highlight
        const color = decoration[1]
        element = h('span', { class: `notion-${color}` }, element)
        break
    }
  }
  return element
})
</script>

<template>
  <template v-if="typeof formattedElement === 'string'">
    {{ formattedElement }}
  </template>
  <component :is="formattedElement" v-else />
</template>
