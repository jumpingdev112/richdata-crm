<!-- biome-ignore lint/correctness/useHookAtTopLevel: This is a presentational component without conditional hooks -->
<template>
  <div class="bg-bg-secondary border border-border rounded-lg overflow-hidden">
    <div class="p-4 border-b border-border">
      <Input
        type="search"
        placeholder="Search contacts..."
        @input="handleSearchInput"
      />
    </div>

    <div class="divide-y divide-border max-h-[600px] overflow-y-auto">
      <button
        v-for="contact in filteredContacts"
        :key="contact.id"
        @click="selectContact(contact.id)"
        :class="[
          'w-full p-4 text-left transition-colors hover:bg-bg-tertiary',
          selectedContact?.id === contact.id ? 'bg-primary/10' : '',
        ]"
      >
        <div>
          <p class="font-semibold text-foreground">{{ contact.name }}</p>
          <p class="text-foreground-subtle text-sm">{{ contact.email }}</p>
          <div v-if="contact.company" class="text-foreground-subtle text-xs mt-1">
            {{ contact.company }}{{ contact.position ? ' • ' + contact.position : '' }}
          </div>
          <div v-if="contact.tags.length" class="flex gap-1 mt-2">
            <Badge
              v-for="tag in contact.tags"
              :key="tag"
              variant="info"
              class="text-xs"
            >
              {{ tag }}
            </Badge>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContactsStore } from '../stores/contacts'
import { computed } from 'vue'
import Badge from '#shared-ui/components/Badge.vue'
import Input from '#shared-ui/components/ui/Input.vue'

const contactsStore = useContactsStore()

const filteredContacts = computed(() => contactsStore.filteredContacts)
const selectedContact = computed(() => contactsStore.selectedContact)

const selectContact = (id: string) => contactsStore.selectContact(id)
const setSearchQuery = (q: string) => contactsStore.setSearchQuery(q)

const handleSearchInput = (e: any) => {
  setSearchQuery(e.target.value)
}
</script>
