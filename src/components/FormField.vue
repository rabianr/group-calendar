<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string
    type?: string
    placeholder?: string
    error?: string
    maxlength?: string
  }>(),
  {
    type: 'text'
  }
)

const model = defineModel()
</script>

<template>
  <div class="mb-3">
    <label :for="id" class="form-label">
      <slot name="label" />
    </label>
    <slot>
      <input
        :id="id"
        :type="type"
        class="form-control"
        :class="{ 'is-invalid': error }"
        :placeholder="placeholder"
        :maxlength="maxlength"
        v-model="model"
      />
    </slot>
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>
