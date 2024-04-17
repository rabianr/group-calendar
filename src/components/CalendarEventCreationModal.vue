<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { Modal } from 'bootstrap'
import { useCalendarStore } from '@/stores/calendar'
import BSModal from './BSModal.vue'
import FormField from './FormField.vue'
import FormFieldSelect from './FormFieldSelect.vue'
import FormFieldTextarea from './FormFieldTextarea.vue'
import FormFieldDateRange from './FormFieldDateRange.vue'
import type { GCEvent } from './CalendarEvent.types'

defineProps<{
  id: string
}>()

const emit = defineEmits<{
  submit: [modal: Modal, member: string, data: GCEvent]
}>()

const calendar = useCalendarStore()
const dates = reactive({ start: '', end: '', error: '' })
const member = reactive({ value: '', error: '' })
const title = reactive({ value: '', error: '' })
const detail = reactive({ value: '', error: '' })
const memberOptions = computed(() =>
  Object.keys(calendar.members).map((v) => ({ value: v, text: v }))
)

// 各フィールドの入力値が変わったらエラーメッセージを初期化
watch([() => dates.start, () => dates.end], () => {
  dates.error = ''
})
watch(
  () => member.value,
  () => {
    member.error = ''
  }
)
watch(
  () => title.value,
  () => {
    title.error = ''
  }
)
watch(
  () => detail.value,
  () => {
    detail.error = ''
  }
)

// 入力バリデーションと送信イベント発行
const submit = (modal: Modal) => {
  title.value = title.value.trim()
  detail.value = detail.value.trim()

  if (!dates.start) {
    dates.error = 'The {attr} field is required.'
  } else if (dates.end && dates.end < dates.start) {
    dates.error = 'The Start Date must be a date before End Date.'
  }

  if (!member.value) {
    member.error = 'The {attr} field is required.'
  } else if (!calendar.memberExists(member.value)) {
    member.error = 'The specified member does not exist.'
  }

  if (!title.value) {
    title.error = 'The {attr} field is required.'
  }

  // エラーがない場合、送信イベントを発行
  if (!dates.error && !member.error && !title.error) {
    emit('submit', modal, member.value, {
      title: title.value,
      detail: detail.value,
      start: dates.start,
      end: dates.end
    })
  }
}

// モーダルが非表示されたら、入力値とエラーメッセージを初期化
const hidden = () => {
  dates.start = ''
  dates.end = ''
  dates.error = ''
  member.value = ''
  member.error = ''
  title.value = ''
  title.error = ''
  detail.value = ''
  detail.error = ''
}
</script>

<template>
  <BSModal :id="id" @submit="submit" @hidden="hidden">
    <template #modalTitle>{{ $t('New Event') }}</template>

    <FormFieldDateRange
      v-model:start="dates.start"
      v-model:end="dates.end"
      :error="dates.error && $t(dates.error, { attr: $t('Start Date') })"
      data-test="date"
    >
      <template #label>{{ $t('Date') }}</template>
    </FormFieldDateRange>
    <FormFieldSelect
      v-model="member.value"
      :options="memberOptions"
      :error="member.error && $t(member.error, { attr: $t('Member') })"
      data-test="member"
    >
      <template #label>{{ $t('Member') }}</template>
    </FormFieldSelect>
    <FormField
      v-model="title.value"
      :error="title.error && $t(title.error, { attr: $t('Title') })"
      maxlength="30"
      data-test="title"
    >
      <template #label>{{ $t('Title') }}</template>
    </FormField>
    <FormFieldTextarea v-model="detail.value" maxlength="100" data-test="detail">
      <template #label>{{ $t('Detail') }}</template>
    </FormFieldTextarea>
  </BSModal>
</template>
