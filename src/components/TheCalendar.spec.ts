import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { addDays, subDays, startOfDay, format } from 'date-fns'
import { i18n } from '@/i18n'
import TheCalendar from './TheCalendar.vue'
import CalendarWeekView from './CalendarWeekView.vue'

describe('TheCalendar', () => {
  const { t } = i18n.global
  const start = startOfDay(new Date())
  const end = addDays(start, 6)

  it('ヘッダータイトルを描画', () => {
    const wrapper = mount(TheCalendar, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: ['CalendarWeekView', 'CalendarMemberCreationModal', 'CalendarEventCreationModal']
      }
    })

    const headerTitle = wrapper.find('.gc-header-title')

    expect(headerTitle.text()).toContain(
      `${format(start, t('MMM d, yyyy'))} – ${format(end, t('MMM d, yyyy'))}`
    )
  })

  it('カレンダーの日付を操作', async () => {
    const wrapper = mount(TheCalendar, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: ['CalendarWeekView', 'CalendarMemberCreationModal', 'CalendarEventCreationModal']
      }
    })

    const btnPrev = wrapper.find('.gc-btn-prev')
    const btnToday = wrapper.find('.gc-btn-today')
    const btnNext = wrapper.find('.gc-btn-next')
    const calendarWeekView = wrapper.findComponent(CalendarWeekView)

    // 日付を今日から1日遅らせる
    await btnPrev.trigger('click')
    expect(calendarWeekView.props('start')).toEqual(subDays(start, 1))
    expect(calendarWeekView.props('end')).toEqual(subDays(end, 1))

    // 日付を今日に戻る
    await btnToday.trigger('click')
    expect(calendarWeekView.props('start')).toEqual(start)
    expect(calendarWeekView.props('end')).toEqual(end)

    // 日付を今日から1日進ませる
    await btnNext.trigger('click')
    expect(calendarWeekView.props('start')).toEqual(addDays(start, 1))
    expect(calendarWeekView.props('end')).toEqual(addDays(end, 1))
  })
})
