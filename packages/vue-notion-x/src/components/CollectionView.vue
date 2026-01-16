<script lang="ts">
export default {
  name: 'NotionCollectionView'
}
</script>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type {
  Collection,
  CollectionView,
  CollectionQueryResult
} from 'notion-types'

const props = defineProps<{
  collection: Collection
  collectionView: CollectionView
  collectionData: CollectionQueryResult
}>()

// Lazy load specific view components
const CollectionViewGallery = defineAsyncComponent(
  () => import('./CollectionViewGallery.vue')
)
// const CollectionViewTable = defineAsyncComponent(() => import('./CollectionViewTable.vue'))
// const CollectionViewList = defineAsyncComponent(() => import('./CollectionViewList.vue'))
// const CollectionViewBoard = defineAsyncComponent(() => import('./CollectionViewBoard.vue'))
</script>

<template>
  <div class="notion-collection-view">
    <CollectionViewGallery
      v-if="collectionView.type === 'gallery'"
      :collection="collection"
      :collection-view="collectionView"
      :collection-data="collectionData"
    />
    <div v-else class="notion-collection-view-fallback">
      Unsupported collection view: {{ collectionView.type }}
    </div>
  </div>
</template>
