<template>
  <div class="grid grid-cols-5 gap-4">
    <div
      v-for="(columnTasks, status) in tasksByStatus"
      :key="status"
      class="bg-bg-secondary border border-border rounded-lg p-4"
    >
      <h3 class="font-semibold text-foreground mb-4 capitalize text-center pb-3 border-b border-border">
        {{ status.replace('-', ' ') }}
        <span class="ml-2 text-foreground-subtle text-sm">({{ columnTasks.length }})</span>
      </h3>

      <div class="space-y-3 min-h-[400px]">
        <button
          v-for="task in columnTasks"
          :key="task.id"
          @click="selectTask(task.id)"
          :class="[
            'w-full p-3 text-left rounded-lg border-l-4 transition-all',
            'hover:shadow-md hover:border-primary hover:scale-105',
            selectedTask?.id === task.id ? 'bg-primary/10 border-primary' : 'bg-bg-tertiary border-border',
          ]"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <p class="font-medium text-foreground text-sm truncate">{{ task.title }}</p>
              <div class="flex gap-1 mt-2 flex-wrap">
                <Badge v-for="label in task.labels" :key="label" variant="info" class="text-xs">
                  {{ label }}
                </Badge>
              </div>
            </div>
            <span :class="[
              'px-2 py-1 rounded text-xs font-semibold whitespace-nowrap',
              priorityColor(task.priority),
            ]">
              {{ task.priority }}
            </span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore';
import { computed, onMounted } from 'vue';

const taskStore = useTaskStore();

const tasksByStatus = computed(() => taskStore.tasksByStatus);
const selectedTask = computed(() => taskStore.selectedTask);

const selectTask = (id: string) => taskStore.selectTask(id);

const priorityColor = (priority: string) => ({
  'low': 'bg-success/20 text-success',
  'medium': 'bg-info/20 text-info',
  'high': 'bg-warning/20 text-warning',
  'urgent': 'bg-error/20 text-error',
})[priority] || '';

onMounted(() => {
  taskStore.fetchTasks();
});
</script>
