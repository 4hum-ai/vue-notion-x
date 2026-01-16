<script lang="ts">
export default {
  name: 'NotionCollectionViewGallery'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type {
  Collection,
  CollectionView,
  CollectionQueryResult,
  PageBlock
} from 'notion-types'
import { useNotionContext } from '../context'
import { cs } from '../utils'
import CollectionCard from './CollectionCard.vue'

const props = defineProps<{
  collection: Collection
  collectionView: CollectionView
  collectionData: CollectionQueryResult
}>()

const { recordMap } = useNotionContext()

const blockIds = computed(() => {
  return (
    props.collectionData.collection_group_results?.blockIds ||
    (props.collectionData as any).blockIds ||
    []
  )
})

const galleryFormat = computed(() => props.collectionView.format || {})
const galleryCoverSize = computed(
  () => galleryFormat.value.gallery_cover_size || 'medium'
)
</script>

<template>
  <div class="notion-gallery">
    <div class="notion-gallery-view">
      <div
        :class="
          cs(
            'notion-gallery-grid',
            `notion-gallery-grid-size-${galleryCoverSize}`
          )
        "
      >
        <CollectionCard
          v-for="blockId in blockIds"
          :key="blockId"
          :block="recordMap.block[blockId]?.value as PageBlock"
          :collection="collection"
          :collection-view="collectionView"
        />
      </div>
    </div>
  </div>
</template>
