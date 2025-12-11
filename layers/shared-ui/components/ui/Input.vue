<template>
  <input
    :class="[
      'w-full px-4 py-2 bg-bg-tertiary border border-border rounded-lg',
      'text-foreground placeholder-foreground-subtle',
      'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
      'transition-colors',
    ]"
    :type="type"
    :placeholder="placeholder"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
  }>(),
  {
    type: 'text',
    placeholder: '',
  }
);
</script>
