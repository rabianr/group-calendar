<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCalendarStore } from '@/stores/calendar'
import type { DisplayEvent } from './CalendarEvent.types'
import IconTrash3 from './IconTrash3.vue'

const props = defineProps<{
  data: DisplayEvent
}>()

const { t } = useI18n()
const tableRef = ref()
const calendar = useCalendarStore()

defineExpose({
  tableRef
})

const deleteEvent = () => {
  const confirmed = confirm(t('Are you sure you want to delete this event?'))

  if (confirmed) {
    calendar.deleteEvent(props.data.memberName!, props.data.id!)
  }
}
</script>

<template>
  <table ref="tableRef" class="table-event-detail">
    <tbody>
      <tr>
        <th class="align-top text-end pe-2">{{ $t('Date') }} :</th>
        <td>
          {{ data.start }} <template v-if="data.start != data.end">～ {{ data.end }} </template>
        </td>
      </tr>
      <tr>
        <th class="align-top text-end pe-2">{{ $t('Detail') }} :</th>
        <td>{{ data.detail }}</td>
      </tr>
      <tr>
        <th></th>
        <td>
          <button type="button" class="btn btn-link text-danger p-0" @click="deleteEvent">
            <IconTrash3 />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.table-event-detail {
  width: 100%;

  th {
    width: 60px;
    color: var(--bs-secondary);
  }

  td {
    white-space: pre-line;
  }
}
</style>
