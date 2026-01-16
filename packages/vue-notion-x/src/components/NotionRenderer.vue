<script setup lang="ts">
import { computed, toRefs, onMounted } from 'vue'
import type { ExtendedRecordMap } from 'notion-types'
import { provideNotionContext } from '../context'
import type {
  MapPageUrlFn,
  MapImageUrlFn,
  SearchNotionFn,
  NotionComponents
} from '../types'
import NotionBlockRenderer from './NotionBlockRenderer.vue'
import mediumZoom from 'medium-zoom'
import type { Zoom } from 'medium-zoom'

// Default component implementations (placeholders for now)
import Text from './text/Text.vue'
import PageLink from './text/PageLink.vue'

const props = withDefaults(
  defineProps<{
    recordMap: ExtendedRecordMap
    components?: Partial<NotionComponents>
    mapPageUrl?: MapPageUrlFn
    mapImageUrl?: MapImageUrlFn
    searchNotion?: SearchNotionFn
    fullPage?: boolean
    darkMode?: boolean
    previewImages?: boolean
    showTableOfContents?: boolean
    minTableOfContentsItems?: number
    defaultPageIcon?: string
    defaultPageCover?: string
    defaultPageCoverPosition?: number
    isImageZoomable?: boolean
  }>(),
  {
    fullPage: false,
    darkMode: false,
    previewImages: false,
    showTableOfContents: false,
    minTableOfContentsItems: 3,
    isImageZoomable: true,
    defaultPageCoverPosition: 0.5,
    mapPageUrl: (pageId: string) => `/${pageId}`,

    mapImageUrl: (url, block) => url
  }
)

// Merge default components with user components
const mergedComponents = computed<NotionComponents>(() => ({
  Image: 'img', // TODO: Implement LazyImage
  Link: 'a',
  PageLink: PageLink,
  Checkbox: 'input', // TODO: Implement Checkbox
  Code: null, // Lazy load
  Equation: null, // Lazy load
  Collection: null,
  Modal: null,
  Pdf: null,
  Header: null, // TODO: Implement Header
  Text: Text, // Add Text component
  ...props.components
}))

// Setup Medium Zoom
let zoom: Zoom | null = null
if (props.isImageZoomable && typeof window !== 'undefined') {
  zoom = mediumZoom({
    background: 'rgba(0, 0, 0, 0.8)',
    minZoomScale: 2.0,
    margin: 24
  })
}

// Provide context
provideNotionContext({
  recordMap: props.recordMap,
  components: mergedComponents.value,
  mapPageUrl: props.mapPageUrl,
  mapImageUrl: props.mapImageUrl,
  searchNotion: props.searchNotion,
  fullPage: props.fullPage,
  darkMode: props.darkMode,
  previewImages: props.previewImages,
  showTableOfContents: props.showTableOfContents,
  minTableOfContentsItems: props.minTableOfContentsItems,
  defaultPageIcon: props.defaultPageIcon,
  defaultPageCover: props.defaultPageCover,
  defaultPageCoverPosition: props.defaultPageCoverPosition
})
</script>

<template>
  <NotionBlockRenderer :level="0" :zoom="isImageZoomable ? zoom : null" />
</template>
