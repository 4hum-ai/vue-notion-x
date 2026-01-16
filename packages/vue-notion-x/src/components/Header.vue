<script lang="ts">
export default {
  name: 'NotionHeader'
}
</script>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { getPageBreadcrumbs } from '@4hum-ai/notion-utils'
import { useNotionContext } from '../context'
import { cs } from '../utils'
import PageIcon from './PageIcon.vue'
import SearchDialog from './SearchDialog.vue'

const props = defineProps<{
  block: any
}>()

const { recordMap, components, mapPageUrl, searchNotion } = useNotionContext()

const breadcrumbs = computed(() => {
  return getPageBreadcrumbs(recordMap, props.block.id)
})

const isSearchOpen = ref(false)

function onOpenSearch() {
  isSearchOpen.value = true
}

function onCloseSearch() {
  isSearchOpen.value = false
}

function handleKeyDown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && (e.key === 'p' || e.key === 'k')) {
    e.preventDefault()
    onOpenSearch()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <header class="notion-header">
    <div class="notion-nav-header">
      <div v-if="breadcrumbs" class="breadcrumbs">
        <template
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="breadcrumb.pageId"
        >
          <component
            :is="breadcrumb.active ? 'div' : components.PageLink"
            v-bind="
              breadcrumb.active ? {} : { href: mapPageUrl(breadcrumb.pageId) }
            "
            :class="cs('breadcrumb', breadcrumb.active && 'active')"
          >
            <PageIcon
              v-if="breadcrumb.icon"
              :block="breadcrumb.block"
              class="icon"
            />

            <span v-if="breadcrumb.title" class="title">
              {{ breadcrumb.title }}
            </span>
          </component>

          <span v-if="index < breadcrumbs.length - 1" class="spacer"> / </span>
        </template>
      </div>

      <div
        v-if="searchNotion"
        role="button"
        class="breadcrumb button notion-search-button"
        @click="onOpenSearch"
      >
        <svg class="searchIcon" viewBox="0 0 24 24">
          <path
            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
        <span class="title">Search</span>
      </div>

      <SearchDialog
        v-if="isSearchOpen"
        :is-open="isSearchOpen"
        :root-block-id="block.id"
        @close="onCloseSearch"
      />
    </div>
  </header>
</template>
