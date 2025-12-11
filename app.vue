<template>
  <div class="flex h-screen bg-bg overflow-hidden">
    <!-- Sidebar -->
    <Sidebar class="flex-shrink-0">
      <div class="space-y-1">
        <SidebarLink to="/" label="Dashboard" icon="📊" />
        <SidebarLink to="/inbox" label="Inbox" icon="📧" />
        <SidebarLink to="/tasks" label="Tasks" icon="✓" />
        <SidebarLink to="/contacts" label="Contacts" icon="👥" />
        <SidebarLink to="/documents" label="Documents" icon="📄" />
        <SidebarLink to="/settings" label="Settings" icon="⚙️" />
      </div>
    </Sidebar>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <Header>
        <template #nav>
          <NuxtLink to="/" class="text-foreground hover:text-primary transition-colors">Dashboard</NuxtLink>
        </template>
        <template #actions>
          <button class="p-2 hover:bg-bg-tertiary rounded-lg transition-colors">🔔</button>
          <button class="p-2 hover:bg-bg-tertiary rounded-lg transition-colors">👤</button>
        </template>
      </Header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="p-8">
          <NuxtPage />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';

definePageMeta({
  layout: false,
})
</script>
