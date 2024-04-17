import { describe, expect, it, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { nextTick } from 'vue'
import CalendarEvent from './CalendarEvent.vue'

describe('CalendarEvent コンポーネント', () => {
  const data = {
    title: 'テスト',
    detail: 'テスト内容',
    start: '2024-04-10',
    end: '2024-04-10',
    colspan: 1,
    pos: 0,
    last: false
  }

  it('スナップショットテスト', async () => {
    const wrapper = shallowMount(CalendarEvent, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      },
      props: {
        data
      }
    })

    const eventWrapper = wrapper.find('.event')
    expect(eventWrapper.text()).toContain('テスト')
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ data: { ...data, end: '2024-04-11', colspan: 2, pos: 1, last: true } })
    expect(eventWrapper.text()).toContain('04/10 - 04/11 テスト')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('イベント詳細を描画する', async () => {
    const wrapper = mount(CalendarEvent, {
      attachTo: document.body,
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      },
      props: {
        data
      }
    })

    const eventWrapper = wrapper.find('.event')

    // Popoverを表示
    await eventWrapper.trigger('click')
    expect(eventWrapper.classes()).toContain('has-popover')
    expect(eventWrapper.find('.popover').exists()).toBeTruthy()

    // Popoverを非表示
    eventWrapper.element.dispatchEvent(new Event('hidden.bs.popover'))
    await nextTick()
    expect(eventWrapper.classes()).not.toContain('has-popover')
    expect(eventWrapper.find('.popover').exists()).toBeFalsy()
  })
})
