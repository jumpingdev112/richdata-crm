<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-foreground">Tasks</h1>
      <div class="flex gap-3">
        <Input type="search" placeholder="Search tasks..." @input="(e: any) => setSearchQuery(e.target.value)" class="w-64" />
        <Button @click="showNewTaskModal = true">+ New Task</Button>
      </div>
    </div>

    <div class="flex gap-3">
      <button
        @click="setFilter('all')"
        :class="[
          'px-4 py-2 rounded-lg transition-colors',
          filter === 'all' ? 'bg-primary text-white' : 'text-foreground hover:bg-bg-secondary',
        ]"
      >
        All
      </button>
      <button
        @click="setFilter('my-tasks')"
        :class="[
          'px-4 py-2 rounded-lg transition-colors',
          filter === 'my-tasks' ? 'bg-primary text-white' : 'text-foreground hover:bg-bg-secondary',
        ]"
      >
        My Tasks
      </button>
      <button
        @click="setFilter('urgent')"
        :class="[
          'px-4 py-2 rounded-lg transition-colors',
          filter === 'urgent' ? 'bg-primary text-white' : 'text-foreground hover:bg-bg-secondary',
        ]"
      >
        Urgent
      </button>
    </div>

    <TaskBoard />
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore';
import { computed, ref } from 'vue';
import { definePageMeta } from '#imports';
import { useHead } from '@vueuse/head';

const taskStore = useTaskStore();

const filter = computed(() => taskStore.filter);
const setFilter = (f: any) => taskStore.setFilter(f);
const setSearchQuery = (q: string) => taskStore.setSearchQuery(q);

const showNewTaskModal = ref(false);

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Tasks - CRM',
});
</script>
