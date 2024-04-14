<script setup lang="ts">
import FormField from './FormField.vue'

defineOptions({
  inheritAttrs: false
})

defineProps<{
  id?: string
  placeholder?: string
  error?: string
}>()

const model = defineModel<string>()
</script>

<template>
  <FormField :error="error">
    <template #label>
      <slot name="label" />
    </template>
    <textarea
      :id="id"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :placeholder="placeholder"
      v-bind="$attrs"
      v-model="model"
    />
  </FormField>
</template>
