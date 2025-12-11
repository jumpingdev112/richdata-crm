<template>
  <div class="bg-bg-secondary border border-border rounded-lg p-6">
    <div v-if="selectedTask" class="flex items-start justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-foreground">{{ selectedTask.title }}</h2>
        <p class="text-foreground-subtle text-sm mt-2">{{ selectedTask.description }}</p>
      </div>
      <button
        @click="deleteTask"
        class="p-2 hover:bg-bg-tertiary rounded-lg transition-colors text-error"
      >
        🗑️
      </button>
    </div>

    <div v-else class="text-center text-foreground-subtle">
      <p>Select a task to view details</p>
    </div>

    <div v-if="selectedTask && selectedTask.subtasks.length" class="mb-6">
      <h3 class="font-semibold text-foreground mb-3">Subtasks</h3>
      <div class="space-y-2">
        <label
          v-for="subtask in selectedTask.subtasks"
          :key="subtask.id"
          class="flex items-center gap-3 p-2 hover:bg-bg-tertiary rounded-lg transition-colors cursor-pointer"
        >
          <input
            type="checkbox"
            :checked="subtask.completed"
            class="w-4 h-4 rounded border-border bg-bg-tertiary"
          />
          <span :class="subtask.completed ? 'line-through text-foreground-subtle' : 'text-foreground'">
            {{ subtask.title }}
          </span>
        </label>
      </div>
    </div>

    <Button variant="secondary" @click="deleteTask">Delete Task</Button>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore';
import { computed } from 'vue';
import Button from '@/components/Button.vue';

const taskStore = useTaskStore();

const selectedTask = computed(() => taskStore.selectedTask);

const updateStatus = (status: any) => {
  if (selectedTask.value) {
    taskStore.updateTaskStatus(selectedTask.value.id, status);
  }
};

const deleteTask = () => {
  if (selectedTask.value) {
    taskStore.deleteTask(selectedTask.value.id);
  }
};
</script>
