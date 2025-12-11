<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      sizeClasses,
      variantClasses,
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    variant: 'primary',
    size: 'md',
  }
);

const sizeClasses = computed(() => ({
  'sm': 'px-3 py-1.5 text-sm rounded-md',
  'md': 'px-4 py-2 text-base rounded-lg',
  'lg': 'px-6 py-3 text-lg rounded-xl',
})[props.size]);

const variantClasses = computed(() => ({
  'primary': 'bg-primary hover:bg-primary-dark text-white',
  'secondary': 'bg-secondary hover:bg-purple-600 text-white',
  'outline': 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  'ghost': 'text-foreground hover:bg-bg-secondary',
})[props.variant]);
</script>
