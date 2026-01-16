<script lang="ts">
export default {
  name: 'NotionHeader'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { getPageBreadcrumbs } from 'notion-utils'
import { useNotionContext } from '../context'
import { cs } from '../utils'
import PageIcon from './PageIcon.vue'

const props = defineProps<{
  block: any
}>()

const { recordMap, components, mapPageUrl } = useNotionContext()

const breadcrumbs = computed(() => {
  return getPageBreadcrumbs(recordMap, props.block.id)
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

      <!-- TODO: Implement Search -->
    </div>
  </header>
</template>
