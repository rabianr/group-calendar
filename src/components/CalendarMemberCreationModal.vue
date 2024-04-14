<script setup lang="ts">
import { reactive, watch } from 'vue'
import { Modal } from 'bootstrap'
import { useCalendarStore } from '@/stores/calendar'
import BSModal from './BSModal.vue'
import FormField from './FormField.vue'

defineProps<{
  id: string
}>()

const emit = defineEmits<{
  submit: [modal: Modal, name: string]
}>()

const { memberExists } = useCalendarStore()
const name = reactive({ value: '', error: '' })

// 入力値が変わったらエラーメッセージを初期化
watch(
  () => name.value,
  () => {
    name.error = ''
  }
)

// 入力バリデーションと送信イベント発行
const submit = (modal: Modal) => {
  name.value = name.value.trim()

  if (!name.value) {
    name.error = 'The {attr} field is required.'
  } else if (memberExists(name.value)) {
    name.error = 'The specified name already exists.'
  }

  // エラーがない場合、送信イベントを発行
  if (!name.error) {
    emit('submit', modal, name.value)
  }
}

// モーダルが非表示されたら、入力値とエラーメッセージを初期化
const hidden = () => {
  name.value = ''
  name.error = ''
}
</script>

<template>
  <BSModal :id="id" @submit="submit" @hidden="hidden">
    <template #modalTitle>{{ $t('New Member') }}</template>

    <FormField
      v-model="name.value"
      :error="name.error && $t(name.error, { attr: $t('Name') })"
      maxlength="8"
    >
      <template #label>{{ $t('Name') }}</template>
    </FormField>
  </BSModal>
</template>
