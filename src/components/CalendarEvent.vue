<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'date-fns'
import { Popover } from 'bootstrap'
import type { DisplayEvent } from './CalendarEvent.types'
import CalendarEventDetail from './CalendarEventDetail.vue'
import CalendarCellSpacer from './CalendarCellSpacer.vue'

const props = defineProps<{
  data: DisplayEvent
}>()

const calendarEventDetailRef = ref()
const hasPopover = ref(false)

const showDetail = (e: Event) => {
  e.preventDefault()

  const target = e.target as HTMLElement

  // イベント（aタグ）がクリックされない場合は処理を中止
  if (!target.classList.contains('event')) {
    return
  }

  const popover = new Popover(target, {
    title: props.data.title,
    content: calendarEventDetailRef.value.tableRef,
    customClass: 'popover-event-detail',
    container: target,
    html: true,
    placement: 'bottom',
    trigger: 'focus'
  })

  target.addEventListener(
    'hidden.bs.popover',
    () => {
      popover.dispose()
      hasPopover.value = false
    },
    { once: true }
  )

  hasPopover.value = true
  popover.show()
}
</script>

<template>
  <a
    href="#"
    class="event"
    :class="{ 'has-popover': hasPopover }"
    :style="{ '--colspan': data.colspan, '--pos': data.pos }"
    @click="showDetail"
    tabindex="0"
  >
    <template v-if="data.start != data.end">
      {{ format(data.start, 'MM/dd') }} - {{ format(data.end, 'MM/dd') }}
    </template>
    {{ data.title }}
  </a>
  <div class="d-none">
    <CalendarEventDetail ref="calendarEventDetailRef" :data="data" />
  </div>
  <CalendarCellSpacer v-if="data.last" :lastPos="data.pos + 1" />
</template>

<style lang="scss" scoped>
.event {
  --pos: 0;
  --colspan: 1;
  position: absolute;
  top: calc(var(--pos) * (var(--evt-height) + var(--evt-margin)));
  left: var(--evt-margin);
  z-index: 10;
  width: calc(
    100% * var(--colspan) - var(--evt-margin, 0) - var(--evt-margin, 0) +
      ((var(--colspan) - 1) * 1px)
  );
  height: var(--evt-height);
  display: block;
  background: var(--bs-primary);
  color: var(--bs-light);
  font-size: 0.85rem;
  text-decoration: none;
  margin-top: var(--evt-margin);
  padding: 1px 3px;
  border-radius: 3px;

  &.has-popover {
    z-index: 20;
  }
}
</style>

<style lang="scss">
.popover-event-detail {
  --bs-popover-max-width: 400px;
  --bs-popover-border-color: var(--bs-dark);
  --bs-popover-header-bg: var(--bs-primary);
  --bs-popover-header-color: var(--bs-white);
  --bs-popover-body-padding-x: 1rem;
  --bs-popover-body-padding-y: 0.5rem;
  width: var(--bs-popover-max-width);
  box-shadow: var(--bs-popover-box-shadow);

  .popover-arrow {
    --bs-popover-bg: var(--bs-primary);
  }

  .popover-header {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
