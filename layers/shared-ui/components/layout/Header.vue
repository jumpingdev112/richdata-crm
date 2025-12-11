<template>
  <header class="bg-bg-secondary border-b border-border sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-lg">CR</span>
        </div>
        <h1 class="text-xl font-bold text-foreground">CRM Dashboard</h1>
      </div>
      <nav class="flex items-center gap-6">
        <slot name="nav" />
      </nav>
      <div class="flex items-center gap-4">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>
