<script setup lang="ts">
import FormField from './FormField.vue'

defineProps<{
  error?: string
}>()

const start = defineModel('start')
const end = defineModel('end')
</script>

<template>
  <FormField :error="error">
    <template #label>
      <slot name="label" />
    </template>
    <div class="input-group has-validation" :class="{ 'is-invalid': error }">
      <input type="date" class="form-control" :class="{ 'is-invalid': error }" v-model="start" />
      <span class="input-group-text">～</span>
      <input type="date" class="form-control" :class="{ 'is-invalid': error }" v-model="end" />
    </div>
  </FormField>
</template>
