<template>
  <NuxtLink
    :to="to"
    :class="[
      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
      'text-foreground-subtle hover:text-foreground hover:bg-bg-tertiary',
      'active:bg-primary active:text-white',
    ]"
  >
    <component v-if="icon" :is="icon" class="w-5 h-5" />
    <span>{{ label }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
  label: string;
  icon?: any;
}>();
</script>
