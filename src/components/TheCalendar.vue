<script setup lang="ts">
import { ref } from 'vue'
import { addDays, subDays, startOfDay } from 'date-fns'
import { Modal } from 'bootstrap'
import { useCalendarStore } from '@/stores/calendar'
import IconChevronLeft from './IconChevronLeft.vue'
import IconChevronRight from './IconChevronRight.vue'
import CalendarWeekView from './CalendarWeekView.vue'
import CalendarMemberCreationModal from './CalendarMemberCreationModal.vue'
import CalendarEventCreationModal from './CalendarEventCreationModal.vue'
import I18nDateDisplay from './I18nDateDisplay.vue'
import type { GCEvent } from './CalendarEvent.types'

const start = ref(startOfDay(new Date()))
const end = ref(addDays(start.value, 6))
const calendar = useCalendarStore()

const nextDay = () => {
  start.value = addDays(start.value, 1)
  end.value = addDays(end.value, 1)
}

const prevDay = () => {
  start.value = subDays(start.value, 1)
  end.value = subDays(end.value, 1)
}

const today = () => {
  start.value = startOfDay(new Date())
  end.value = addDays(start.value, 6)
}

const addMember = (modal: Modal, name: string) => {
  calendar.addMember(name)
  modal.hide()
}

const addEvent = (modal: Modal, member: string, data: GCEvent) => {
  calendar.addEvent(member, data)
  modal.hide()
}
</script>

<template>
  <div class="d-flex justify-content-between align-items-center my-4">
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-primary gc-btn-prev" @click="prevDay">
        <IconChevronLeft class="bi" />
      </button>
      <button type="button" class="btn btn-primary gc-btn-today" @click="today">
        {{ $t('Today') }}
      </button>
      <button type="button" class="btn btn-primary gc-btn-next" @click="nextDay">
        <IconChevronRight class="bi" />
      </button>
    </div>
    <h4 class="m-0 gc-header-title">
      <I18nDateDisplay :date="start" :format-str="$t('MMM d, yyyy')" /> –
      <I18nDateDisplay :date="end" :format-str="$t('MMM d, yyyy')" />
    </h4>
    <div class="d-flex gap-2">
      <button
        type="button"
        class="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#memberCreationModal"
      >
        {{ $t('Add member') }}
      </button>
      <button
        type="button"
        class="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#eventCreationModal"
      >
        {{ $t('Add event') }}
      </button>
    </div>
  </div>

  <CalendarWeekView :start="start" :end="end" />

  <CalendarMemberCreationModal id="memberCreationModal" @submit="addMember" />

  <CalendarEventCreationModal id="eventCreationModal" @submit="addEvent" />
</template>
