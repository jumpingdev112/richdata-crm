<!-- biome-ignore lint/correctness/useHookAtTopLevel: onMounted is called at the correct top level -->
<template>
  <div class="grid grid-cols-3 gap-6">
    <div class="col-span-1">
      <div class="mb-4">
        <Button class="w-full">+ Add Contact</Button>
      </div>
      <ContactsList />
    </div>

    <div class="col-span-2">
      <template v-if="selectedContact">
        <div class="bg-bg-secondary border border-border rounded-lg p-6">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold text-foreground">{{ selectedContact.name }}</h2>
              <p v-if="selectedContact.company" class="text-foreground-subtle text-sm mt-1">
                {{ selectedContact.position }} at {{ selectedContact.company }}
              </p>
            </div>
            <button
              @click="deleteContact"
              class="p-2 hover:bg-bg-tertiary rounded-lg transition-colors text-error"
            >
              🗑️
            </button>
          </div>

          <div class="space-y-4 mb-6">
            <div>
              <label class="text-foreground-subtle text-sm">Email</label>
              <p class="text-foreground text-lg">{{ selectedContact.email }}</p>
            </div>
            <div v-if="selectedContact.phone">
              <label class="text-foreground-subtle text-sm">Phone</label>
              <p class="text-foreground">{{ selectedContact.phone }}</p>
            </div>
            <div v-if="selectedContact.notes">
              <label class="text-foreground-subtle text-sm">Notes</label>
              <p class="text-foreground">{{ selectedContact.notes }}</p>
            </div>
            <div v-if="selectedContact.lastInteraction">
              <label class="text-foreground-subtle text-sm">Last Interaction</label>
              <p class="text-foreground">{{ formatDate(selectedContact.lastInteraction) }}</p>
            </div>
          </div>

          <Button variant="secondary" @click="deleteContact">Delete Contact</Button>
        </div>
      </template>

      <div v-else class="bg-bg-secondary border border-border rounded-lg p-6 text-center text-foreground-subtle">
        <p>Select a contact to view details</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContactsStore } from '../stores/contacts'
import { computed, onMounted } from 'vue'
import { definePageMeta, useHead } from '#imports'
import ContactsList from '../components/ContactsList.vue'
import Button from '#shared-ui/components/ui/Button.vue'

const contactsStore = useContactsStore()

const selectedContact = computed(() => contactsStore.selectedContact)

const deleteContact = () => {
  if (selectedContact.value) {
    contactsStore.deleteContact(selectedContact.value.id)
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Contacts - CRM',
})

onMounted(() => {
  contactsStore.fetchContacts()
})
</script>
