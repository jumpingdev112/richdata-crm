<template>
  <Teleport to="body" v-if="isOpen">
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-bg-secondary border border-border rounded-xl shadow-lg max-w-lg w-full mx-4">
        <div class="flex items-center justify-between p-6 border-b border-border">
          <h2 class="text-lg font-semibold text-foreground">
            <slot name="title" />
          </h2>
          <button
            @click="$emit('close')"
            class="text-foreground-subtle hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>
        <div class="p-6">
          <slot />
        </div>
        <div class="flex gap-3 justify-end p-6 border-t border-border">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  close: [];
}>();
</script>
