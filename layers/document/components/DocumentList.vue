<!-- biome-ignore lint/correctness/useHookAtTopLevel: This is a presentational component without conditional hooks -->
<template>
  <div class="space-y-4">
    <div
      v-for="doc in filteredDocuments"
      :key="doc.id"
      @click="selectDocument(doc.id)"
      :class="[
        'p-4 bg-bg-secondary border border-border rounded-lg cursor-pointer transition-all',
        'hover:border-primary hover:shadow-lg',
        selectedDocument?.id === doc.id ? 'border-primary bg-primary/5' : '',
      ]"
    >
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h3 class="font-semibold text-foreground">{{ doc.title }}</h3>
          <p class="text-foreground-subtle text-sm mt-1">{{ doc.description }}</p>
          <div class="flex gap-2 mt-3 flex-wrap">
            <Badge variant="info" class="text-xs">{{ doc.type }}</Badge>
            <Badge :variant="statusVariant(doc.status)" class="text-xs">{{ doc.status }}</Badge>
            <Badge
              v-for="tag in doc.tags"
              :key="tag"
              variant="info"
              class="text-xs"
            >
              {{ tag }}
            </Badge>
          </div>
        </div>
        <span class="text-foreground-subtle text-xs whitespace-nowrap ml-4">
          {{ formatDate(doc.updatedAt) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDocumentStore } from '../stores/document'
import { computed } from 'vue'
import Badge from '#shared-ui/components/Badge.vue'

const documentStore = useDocumentStore()

const filteredDocuments = computed(() => documentStore.filteredDocuments)
const selectedDocument = computed(() => documentStore.selectedDocument)

const selectDocument = (id: string) => documentStore.selectDocument(id)

const statusVariant = (status: string): any => ({
  'draft': 'warning',
  'pending-review': 'info',
  'approved': 'success',
  'archived': 'warning',
}[status])

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}
</script>
