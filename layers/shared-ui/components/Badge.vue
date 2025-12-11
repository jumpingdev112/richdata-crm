<template>
  <span
    :class="[
      'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
      variantClasses,
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  }>(),
  {
    variant: 'primary',
  }
);

const variantClasses = computed(() => ({
  'primary': 'bg-primary/20 text-primary',
  'success': 'bg-success/20 text-success',
  'warning': 'bg-warning/20 text-warning',
  'error': 'bg-error/20 text-error',
  'info': 'bg-info/20 text-info',
})[props.variant]);
</script>
