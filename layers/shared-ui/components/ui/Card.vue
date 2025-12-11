<template>
  <div
    :class="[
      'bg-bg-secondary border border-border rounded-lg overflow-hidden',
      'transition-shadow hover:shadow-lg',
      className,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    className?: string;
  }>(),
  {
    className: '',
  }
);
</script>
