<script lang="ts">
export default {
  name: 'NotionCollectionViewBoard'
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
import Property from './Property.vue'

const props = defineProps<{
  collection: Collection
  collectionView: CollectionView
  collectionData: CollectionQueryResult
}>()

const { recordMap } = useNotionContext()

const boardFormat = computed(() => props.collectionView.format || {})
const boardCoverSize = computed(
  () => boardFormat.value.board_cover_size || 'medium'
)

// Board groups logic depends on how the data is structured in the recordMap
const boardGroups = computed(() => {
  return (
    boardFormat.value.board_columns || boardFormat.value.board_groups2 || []
  )
})

// This is a simplified version of board results mapping
const getGroupResults = (group: any) => {
  const groupKey = `results:${group?.value?.type}:${group?.value?.value || 'uncategorized'}`
  return (props.collectionData as any)[groupKey] || { blockIds: [] }
}
</script>

<template>
  <div class="notion-board">
    <div
      :class="
        cs('notion-board-view', `notion-board-view-size-${boardCoverSize}`)
      "
    >
      <div class="notion-board-header">
        <div class="notion-board-header-inner">
          <div
            v-for="(p, index) in boardGroups"
            :key="index"
            class="notion-board-th"
          >
            <div v-if="!p.hidden" class="notion-board-th-body">
              <span class="notion-board-th-title">
                {{ p.value?.value || 'No Select' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="notion-board-body">
        <div
          v-for="(p, index) in boardGroups"
          :key="index"
          class="notion-board-group"
        >
          <template v-if="!p.hidden">
            <template
              v-for="blockId in getGroupResults(p).blockIds"
              :key="blockId"
            >
              <CollectionCard
                v-if="recordMap.block[blockId]?.value"
                :block="recordMap.block[blockId].value as PageBlock"
                :collection="collection"
                :collection-view="collectionView"
                class="notion-board-group-card"
              />
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
