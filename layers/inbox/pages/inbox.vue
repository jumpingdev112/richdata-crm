<!-- biome-ignore lint/correctness/useHookAtTopLevel: onMounted is called at the correct top level -->
<template>
  <div class="grid grid-cols-3 gap-6">
    <div class="col-span-1">
      <div class="space-y-3 mb-4">
        <button
          @click="setFilter('all')"
          :class="[
            'w-full px-4 py-2 rounded-lg text-left transition-colors',
            filter === 'all' ? 'bg-primary text-white' : 'text-foreground hover:bg-bg-tertiary',
          ]"
        >
          All Emails
        </button>
        <button
          @click="setFilter('unread')"
          :class="[
            'w-full px-4 py-2 rounded-lg text-left transition-colors',
            filter === 'unread' ? 'bg-primary text-white' : 'text-foreground hover:bg-bg-tertiary',
          ]"
        >
          Unread
        </button>
        <button
          @click="setFilter('starred')"
          :class="[
            'w-full px-4 py-2 rounded-lg text-left transition-colors',
            filter === 'starred' ? 'bg-primary text-white' : 'text-foreground hover:bg-bg-tertiary',
          ]"
        >
          Starred
        </button>
      </div>
      <InboxList />
    </div>
    <div class="col-span-2">
      <EmailDetail />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInboxStore } from '../stores/inbox'
import { computed, onMounted } from 'vue'
import { definePageMeta, useHead } from '#imports'
import InboxList from '../components/InboxList.vue'
import EmailDetail from '../components/EmailDetail.vue'

const inboxStore = useInboxStore()

const filter = computed(() => inboxStore.filter)
const setFilter = (f: 'all' | 'unread' | 'starred') => inboxStore.setFilter(f)

onMounted(() => {
  inboxStore.fetchEmails()
})

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Inbox - CRM',
})
</script>
