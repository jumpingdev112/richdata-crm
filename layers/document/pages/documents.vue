<!-- biome-ignore lint/correctness/useHookAtTopLevel: onMounted is called at the correct top level -->
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-foreground">Documents</h1>
      <Button>+ Upload Document</Button>
    </div>

    <div class="grid grid-cols-5 gap-3">
      <button
        @click="setFilter('all')"
        :class="[
          'px-4 py-2 rounded-lg transition-colors',
          filter === 'all' ? 'bg-primary text-white' : 'text-foreground hover:bg-bg-secondary',
        ]"
      >
        All ({{ documents.length }})
      </button>
      <button
        @click="setFilter('my-docs')"
        :class="[
          'px-4 py-2 rounded-lg transition-colors',
          filter === 'my-docs' ? 'bg-primary text-white' : 'text-foreground hover:bg-bg-secondary',
        ]"
      >
        My Documents
      </button>
      <button
        @click="setFilter('shared')"
        :class="[
          'px-4 py-2 rounded-lg transition-colors',
          filter === 'shared' ? 'bg-primary text-white' : 'text-foreground hover:bg-bg-secondary',
        ]"
      >
        Shared
      </button>
    </div>

    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2">
        <DocumentList />
      </div>

      <div>
        <template v-if="selectedDocument">
          <div class="bg-bg-secondary border border-border rounded-lg p-6">
            <h2 class="text-lg font-bold text-foreground mb-4">{{ selectedDocument.title }}</h2>
            <div class="space-y-3 text-sm">
              <div>
                <label class="text-foreground-subtle">Type</label>
                <p class="text-foreground capitalize">{{ selectedDocument.type }}</p>
              </div>
              <div>
                <label class="text-foreground-subtle">Status</label>
                <Badge :variant="statusVariant(selectedDocument.status)">
                  {{ selectedDocument.status }}
                </Badge>
              </div>
              <div v-if="selectedDocument.sharedWith.length">
                <label class="text-foreground-subtle">Shared with</label>
                <p class="text-foreground">{{ selectedDocument.sharedWith.join(', ') }}</p>
              </div>
            </div>
            <Button variant="secondary" @click="deleteDocument" class="w-full mt-6">Delete</Button>
          </div>
        </template>

        <div v-else class="bg-bg-secondary border border-border rounded-lg p-6 text-center text-foreground-subtle">
          <p>Select a document to view</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDocumentStore } from '../stores/document'
import { computed, onMounted } from 'vue'
import { definePageMeta, useHead } from '#imports'
import DocumentList from '../components/DocumentList.vue'
import Button from '#shared-ui/components/ui/Button.vue'
import Badge from '#shared-ui/components/Badge.vue'

const documentStore = useDocumentStore()

const documents = computed(() => documentStore.documents)
const filter = computed(() => documentStore.filter)
const selectedDocument = computed(() => documentStore.selectedDocument)

const setFilter = (f: any) => documentStore.setFilter(f)
const deleteDocument = () => {
  if (selectedDocument.value) {
    documentStore.deleteDocument(selectedDocument.value.id)
  }
}

const statusVariant = (status: string): any => ({
  'draft': 'warning',
  'pending-review': 'info',
  'approved': 'success',
  'archived': 'warning',
}[status])

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Documents - CRM',
})

onMounted(() => {
  documentStore.fetchDocuments()
})
</script>
