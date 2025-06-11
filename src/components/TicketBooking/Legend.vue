<template>
  <div class="flex items-center gap-2">
    <div class="w-5 h-5 rounded border" :class="color" />
    <span>{{ text }}</span>
  </div>
</template>

<script setup>
const props = defineProps({ color: String, text: String })
</script>
