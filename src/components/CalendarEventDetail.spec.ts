import { describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import CalendarEventDetail from './CalendarEventDetail.vue'

describe('CalendarEventDetail コンポーネント', () => {
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
    const wrapper = shallowMount(CalendarEventDetail, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      },
      props: {
        data
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ data: { ...data, end: '2024-04-11', colspan: 2 } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
