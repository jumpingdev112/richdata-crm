<!-- biome-ignore lint/correctness/useHookAtTopLevel: This is a presentational component without conditional hooks -->
<template>
  <div class="bg-bg-secondary border border-border rounded-lg overflow-hidden">
    <div class="p-4 border-b border-border flex items-center justify-between">
      <h2 class="text-lg font-semibold text-foreground">Inbox</h2>
      <Badge variant="info">{{ unreadCount }} new</Badge>
    </div>

    <div class="divide-y divide-border max-h-[500px] overflow-y-auto">
      <button
        v-for="email in filteredEmails"
        :key="email.id"
        @click="selectEmail(email.id)"
        :class="[
          'w-full p-4 text-left transition-colors border-l-4',
          selectedEmail?.id === email.id ? 'bg-bg-tertiary border-primary' : 'hover:bg-bg-tertiary border-transparent',
          !email.read ? 'font-semibold' : 'font-normal',
        ]"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <p class="text-foreground truncate">{{ email.from }}</p>
              <Badge v-if="!email.read" variant="warning">new</Badge>
            </div>
            <p class="text-foreground text-sm mt-1 truncate">{{ email.subject }}</p>
            <p class="text-foreground-subtle text-xs mt-1 line-clamp-1">{{ email.preview }}</p>
          </div>
          <button
            @click.stop="toggleStarred(email.id)"
            class="text-lg mt-1"
          >
            {{ email.starred ? '⭐' : '☆' }}
          </button>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInboxStore } from '../stores/inbox'
import { computed } from 'vue'
import Badge from '#shared-ui/components/Badge.vue'

const inboxStore = useInboxStore()

const unreadCount = computed(() => inboxStore.unreadCount)
const filteredEmails = computed(() => inboxStore.filteredEmails)
const selectedEmail = computed(() => inboxStore.selectedEmail)

const selectEmail = (id: string) => inboxStore.selectEmail(id)
const toggleStarred = (id: string) => inboxStore.toggleStarred(id)
</script>
