<script setup lang="ts">
import { computed } from 'vue'
import {
  isSunday,
  isSaturday,
  isBefore,
  isAfter,
  addDays,
  differenceInDays,
  min as minDate,
  format,
  parseISO
} from 'date-fns'
import { useI18n } from 'vue-i18n'
import { useCalendarStore } from '@/stores/calendar'
import type { GCEvent, DisplayEvent } from './CalendarEvent.types'
import CalendarEvent from './CalendarEvent.vue'
import I18nDateDisplay from './I18nDateDisplay.vue'
import IconTrash3 from './IconTrash3.vue'

const props = defineProps<{
  start: Date
  end: Date
}>()

const { t } = useI18n()
const calendar = useCalendarStore()

// start から end までの日付配列を生成
const dates = computed(() => {
  const arr = []

  for (let curr = props.start; !isAfter(curr, props.end); curr = addDays(curr, 1)) {
    arr.push(curr)
  }

  return arr
})

// 表示のため、データのグルーピング、イベントの配置位置を事前に計算
const memberData = computed(() => {
  // 返却値
  const ret: { [key: string]: { [key: string]: DisplayEvent[] } } = {}
  // 一つのセルに配置したイベントの配列、値はセルの連結値（colspan）
  const currPlacements: number[] = []

  /**
   * イベントが配置可能な位置を検索
   *
   * @param colspan 横方向のセルの連結
   * @returns 0ベースのインデックス位置
   */
  const findPlaceablePos = (colspan: number): number => {
    let pos = 0

    while (currPlacements[pos]) {
      pos++
    }

    currPlacements[pos] = colspan

    return pos
  }

  /**
   * 現セルに全イベントが配置完了したら、各 colspan を１引いて、次のセル配置に備える
   */
  const finishPlacing = () => {
    for (let key in currPlacements) {
      if (currPlacements[key] > 0) {
        currPlacements[key]--
      }
    }
  }

  for (let member in calendar.members) {
    const groupedEvents: { [key: string]: (GCEvent & { colspan: number })[] } = {}

    // イベントを開始日毎にグルーピング、セルの連結を計算
    for (let event of calendar.members[member]) {
      const evStart = parseISO(event.start)
      const evEnd = parseISO(event.end)

      // イベント開始日は表示範囲内かチェック
      if (!isBefore(evStart, props.start) && !isAfter(evStart, props.end)) {
        if (!groupedEvents[event.start]) {
          groupedEvents[event.start] = []
        }

        groupedEvents[event.start].push({
          ...event,
          colspan: Math.min(7, differenceInDays(minDate([evEnd, props.end]), evStart) + 1)
        })

        // イベント開始日は表示開始日以前とイベント終了日は表示開始日以降かチェック
      } else if (isBefore(evStart, props.start) && !isBefore(evEnd, props.start)) {
        const dKey = format(props.start, 'yyyy-MM-dd')

        if (!groupedEvents[dKey]) {
          groupedEvents[dKey] = []
        }

        groupedEvents[dKey].push({
          ...event,
          colspan: Math.min(7, differenceInDays(evEnd, props.start) + 1)
        })
      }
    }

    ret[member] = {}

    // セル毎にイベントの配置位置を計算
    for (let d of dates.value) {
      const dKey = format(d, 'yyyy-MM-dd')
      const arr: DisplayEvent[] = []

      if (groupedEvents[dKey]) {
        // 降順でセルの連結で並び替え
        groupedEvents[dKey].sort((a, b) => {
          if (a.colspan == b.colspan) {
            return a.start > b.start ? 1 : -1
          }

          return a.colspan > b.colspan ? -1 : 1
        })

        for (let i = 0; i < groupedEvents[dKey].length; i++) {
          arr.push({
            ...groupedEvents[dKey][i],
            pos: findPlaceablePos(groupedEvents[dKey][i].colspan),
            last: i == groupedEvents[dKey].length - 1
          })
        }
      }

      finishPlacing()

      ret[member][dKey] = arr
    }
  }

  return ret
})

const deleteMember = (name: string) => {
  const confirmed = confirm(t('Are you sure you want to delete this member?'))

  if (confirmed) {
    calendar.deleteMember(name)
  }
}
</script>

<template>
  <table class="table table-bordered border-secondary-subtle">
    <thead>
      <tr>
        <th class="col-header text-center">{{ $t('Member') }}</th>
        <th
          v-for="d in dates"
          :key="d.getTime()"
          class="col-header text-center"
          :class="{ 'text-danger': isSunday(d), 'text-info': isSaturday(d) }"
        >
          <I18nDateDisplay :date="d" format-str="M/d (E)" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(eventData, member) in memberData" :key="member">
        <td>
          {{ member }}
          <div class="mt-1">
            <button
              type="button"
              class="btn btn-link text-danger p-0"
              @click="() => deleteMember(member as string)"
            >
              <IconTrash3 />
            </button>
          </div>
        </td>
        <td class="col-events" v-for="(events, date) in eventData" :key="date">
          <CalendarEvent v-for="(event, index) in events" :key="index" :data="event" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.table {
  table-layout: fixed;

  .col-header {
    font-weight: var(--bs-body-font-weight);
  }

  .col-events {
    --evt-height: 23px;
    --evt-margin: 2px;
    position: relative;
    height: 90px;
    padding: 0;
  }
}
</style>
