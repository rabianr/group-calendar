<script setup lang="ts">
defineProps<{
  lastPos: number
}>()
</script>

<template>
  <div
    :style="{
      height: `calc(${lastPos} * (var(--evt-height) + var(--evt-margin)) + var(--evt-margin))`
    }"
  />
</template>
