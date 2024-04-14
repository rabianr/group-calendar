<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { type FormatOptions, format } from 'date-fns'
import { ja } from 'date-fns/locale'

defineProps<{
  date: Date | number | string
  formatStr: string
  options?: FormatOptions
}>()

const { locale } = useI18n()
</script>

<template>
  {{ format(date, formatStr, { locale: locale == 'ja' ? ja : undefined, ...options }) }}
</template>
