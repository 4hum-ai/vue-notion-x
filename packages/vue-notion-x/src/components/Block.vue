<script setup lang="ts">
import { computed } from 'vue'
import type { Block } from 'notion-types'
import { useNotionContext } from '../context'
import { cs, uuidToId, getTextContent } from '../utils'
import Text from './text/Text.vue'
import PageLink from './text/PageLink.vue'

const props = defineProps<{
  block: Block
  level: number
  className?: string
  hideBlockId?: boolean
}>()

const { components, mapPageUrl, fullPage, darkMode } = useNotionContext()

const blockId = computed(() =>
  props.hideBlockId
    ? 'notion-block'
    : `notion-block-${uuidToId(props.block.id)}`
)

const blockColor = computed(() => {
  return props.block.format?.block_color
    ? `notion-${props.block.format.block_color}`
    : undefined
})

const title = computed(() => props.block.properties?.title)
</script>

<template>
  <!-- Page -->
  <main
    v-if="block.type === 'page'"
    :class="
      cs(
        'notion',
        'notion-page',
        darkMode ? 'dark-mode' : 'light-mode',
        blockId,
        className
      )
    "
  >
    <div v-if="fullPage" class="notion-frame">
      <!-- TODO: Header, Cover, Title -->
      <h1 class="notion-title">
        <Text :value="title" :block="block" />
      </h1>
      <div class="notion-page-content">
        <slot />
      </div>
    </div>
    <div v-else>
      <slot />
    </div>
  </main>

  <!-- Header 1 -->
  <h1
    v-else-if="block.type === 'header'"
    :class="cs('notion-h', 'notion-h1', blockColor, blockId)"
  >
    <!-- TODO: Anchor link -->
    <span class="notion-h-title">
      <Text :value="title" :block="block" />
    </span>
  </h1>

  <!-- Header 2 -->
  <h2
    v-else-if="block.type === 'sub_header'"
    :class="cs('notion-h', 'notion-h2', blockColor, blockId)"
  >
    <span class="notion-h-title">
      <Text :value="title" :block="block" />
    </span>
  </h2>

  <!-- Header 3 -->
  <h3
    v-else-if="block.type === 'sub_sub_header'"
    :class="cs('notion-h', 'notion-h3', blockColor, blockId)"
  >
    <span class="notion-h-title">
      <Text :value="title" :block="block" />
    </span>
  </h3>

  <!-- Text -->
  <div
    v-else-if="block.type === 'text'"
    :class="cs('notion-text', blockColor, blockId)"
  >
    <template v-if="title">
      <Text :value="title" :block="block" />
    </template>
    <div v-else class="notion-blank">&nbsp;</div>
    <slot />
    <!-- Text block can have children (indented blocks) -->
  </div>

  <!-- Bullet List -->
  <ul
    v-else-if="block.type === 'bulleted_list'"
    :class="cs('notion-list', 'notion-list-disc', blockId)"
  >
    <li>
      <Text :value="title" :block="block" />
    </li>
    <slot />
    <!-- Children are nested lists -->
  </ul>

  <!-- Numbered List -->
  <ol
    v-else-if="block.type === 'numbered_list'"
    :class="cs('notion-list', 'notion-list-numbered', blockId)"
  >
    <li>
      <Text :value="title" :block="block" />
    </li>
    <slot />
  </ol>

  <!-- Toggle -->
  <details
    v-else-if="block.type === 'toggle'"
    :class="cs('notion-toggle', blockId)"
  >
    <summary>
      <Text :value="title" :block="block" />
    </summary>
    <div>
      <slot />
    </div>
  </details>

  <!-- Divider -->
  <hr v-else-if="block.type === 'divider'" :class="cs('notion-hr', blockId)" />

  <!-- Quote -->
  <blockquote
    v-else-if="block.type === 'quote'"
    :class="cs('notion-quote', blockColor, blockId)"
  >
    <div>
      <Text :value="title" :block="block" />
    </div>
    <slot />
  </blockquote>

  <!-- Callout -->
  <div
    v-else-if="block.type === 'callout'"
    :class="
      cs('notion-callout', blockColor ? `${blockColor}_co` : undefined, blockId)
    "
  >
    <!-- TODO: Icon -->
    <div class="notion-callout-text">
      <Text :value="title" :block="block" />
      <slot />
    </div>
  </div>

  <!-- Default Fallback -->
  <div v-else :class="cs('notion-block-fallback', blockId)">
    <!-- Unknown block type: {{ block.type }} -->
  </div>
</template>
