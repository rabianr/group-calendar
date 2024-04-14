<script setup lang="ts">
import FormField from './FormField.vue'

defineOptions({
  inheritAttrs: false
})

defineProps<{
  options: { value: string; text: string }[]
  error?: string
}>()

const model = defineModel()
</script>

<template>
  <FormField :error="error">
    <template #label>
      <slot name="label" />
    </template>
    <select class="form-select" :class="{ 'is-invalid': error }" v-bind="$attrs" v-model="model">
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.text }}</option>
    </select>
  </FormField>
</template>
