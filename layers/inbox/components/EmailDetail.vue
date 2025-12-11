<!-- biome-ignore lint/correctness/useHookAtTopLevel: This is a presentational component without conditional hooks -->
<template>
  <div class="bg-bg-secondary border border-border rounded-lg p-6">
    <div class="flex items-start justify-between mb-4">
      <div>
        <h2 class="text-2xl font-bold text-foreground">{{ selectedEmail?.subject }}</h2>
        <p class="text-foreground-subtle text-sm mt-2">From: {{ selectedEmail?.from }}</p>
      </div>
      <div class="flex gap-2">
        <button
          @click="toggleRead"
          class="p-2 hover:bg-bg-tertiary rounded-lg transition-colors"
          :title="selectedEmail?.read ? 'Mark as unread' : 'Mark as read'"
        >
          {{ selectedEmail?.read ? '✓' : '○' }}
        </button>
        <button
          @click="toggleStarred"
          class="p-2 hover:bg-bg-tertiary rounded-lg transition-colors text-lg"
        >
          {{ selectedEmail?.starred ? '⭐' : '☆' }}
        </button>
      </div>
    </div>

    <div class="prose prose-invert max-w-none mb-6">
      <p class="text-foreground">{{ selectedEmail?.body }}</p>
    </div>

    <div v-if="selectedEmail?.attachments.length" class="border-t border-border pt-4">
      <h3 class="font-semibold text-foreground mb-3">Attachments</h3>
      <div class="space-y-2">
        <div
          v-for="(att, i) in selectedEmail?.attachments"
          :key="i"
          class="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg"
        >
          <span class="text-foreground">📎 {{ att.name }}</span>
          <span class="text-foreground-subtle text-sm">{{ att.size }}</span>
        </div>
      </div>
    </div>

    <div class="flex gap-2 mt-6">
      <Button variant="secondary" @click="deleteEmail">Delete</Button>
      <Button variant="outline">Reply</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInboxStore } from '../stores/inbox'
import { computed } from 'vue'
import Button from '#shared-ui/components/ui/Button.vue'

const inboxStore = useInboxStore()

const selectedEmail = computed(() => inboxStore.selectedEmail)

const toggleRead = () => {
  if (selectedEmail.value) {
    inboxStore.toggleRead(selectedEmail.value.id)
  }
}

const toggleStarred = () => {
  if (selectedEmail.value) {
    inboxStore.toggleStarred(selectedEmail.value.id)
  }
}

const deleteEmail = () => {
  if (selectedEmail.value) {
    inboxStore.deleteEmail(selectedEmail.value.id)
  }
}
</script>
