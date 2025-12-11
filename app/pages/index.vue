<!-- biome-ignore lint/correctness/useHookAtTopLevel: onMounted is called at the correct top level -->
<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-4xl font-bold text-foreground">Welcome back!</h1>
      <p class="text-foreground-subtle text-lg mt-2">Here's what's happening with your business today</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-4 gap-4">
      <Card>
        <div class="p-6">
          <p class="text-foreground-subtle text-sm">New Emails</p>
          <p class="text-3xl font-bold text-primary mt-2">{{ unreadEmails }}</p>
        </div>
      </Card>

      <Card>
        <div class="p-6">
          <p class="text-foreground-subtle text-sm">Active Tasks</p>
          <p class="text-3xl font-bold text-primary mt-2">{{ activeTasks }}</p>
        </div>
      </Card>

      <Card>
        <div class="p-6">
          <p class="text-foreground-subtle text-sm">Contacts</p>
          <p class="text-3xl font-bold text-primary mt-2">{{ totalContacts }}</p>
        </div>
      </Card>

      <Card>
        <div class="p-6">
          <p class="text-foreground-subtle text-sm">Documents</p>
          <p class="text-3xl font-bold text-primary mt-2">{{ totalDocuments }}</p>
        </div>
      </Card>
    </div>

    <!-- Quick Actions -->
    <Card>
      <div class="p-6">
        <h2 class="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div class="grid grid-cols-4 gap-3">
          <Button @click="navigateTo('/inbox')">📧 Check Emails</Button>
          <Button @click="navigateTo('/tasks')">✓ View Tasks</Button>
          <Button @click="navigateTo('/contacts')">👥 Add Contact</Button>
          <Button @click="navigateTo('/documents')">📄 Upload Document</Button>
        </div>
      </div>
    </Card>

    <!-- Recent Activity -->
    <div class="grid grid-cols-2 gap-6">
      <Card>
        <div class="p-6">
          <h3 class="text-lg font-bold text-foreground mb-4">Recent Emails</h3>
          <div class="space-y-3">
            <div v-for="email in recentEmails" :key="email.id" class="pb-3 border-b border-border last:border-0">
              <p class="font-medium text-foreground truncate">{{ email.subject }}</p>
              <p class="text-foreground-subtle text-sm">{{ email.from }}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div class="p-6">
          <h3 class="text-lg font-bold text-foreground mb-4">Urgent Tasks</h3>
          <div class="space-y-3">
            <div v-for="task in urgentTasks" :key="task.id" class="pb-3 border-b border-border last:border-0">
              <p class="font-medium text-foreground truncate">{{ task.title }}</p>
              <p class="text-foreground-subtle text-sm">Due: {{ formatDate(task.dueDate) }}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInboxStore, useTaskStore, useContactsStore, useDocumentStore } from '~/stores'
import { computed, onMounted } from 'vue'
import { definePageMeta, useHead, navigateTo } from '#imports'
import Card from '#shared-ui/components/ui/Card.vue'
import Button from '#shared-ui/components/ui/Button.vue'

const inboxStore = useInboxStore()
const taskStore = useTaskStore()
const contactsStore = useContactsStore()
const documentStore = useDocumentStore()

const unreadEmails = computed(() => inboxStore.unreadCount)
const activeTasks = computed(() => taskStore.tasks.filter(t => t.status !== 'done').length)
const totalContacts = computed(() => contactsStore.contacts.length)
const totalDocuments = computed(() => documentStore.documents.length)

const recentEmails = computed(() => inboxStore.emails.slice(0, 3))
const urgentTasks = computed(() => taskStore.tasks.filter(t => t.priority === 'urgent' && t.status !== 'done').slice(0, 3))

const formatDate = (date?: Date) => {
  if (!date) return 'No date'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Dashboard - CRM',
})

onMounted(async () => {
  await inboxStore.fetchEmails()
  await taskStore.fetchTasks()
  await contactsStore.fetchContacts()
  await documentStore.fetchDocuments()
})
</script>
