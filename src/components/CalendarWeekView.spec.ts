import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import CalendarWeekView from './CalendarWeekView.vue'

describe('CalendarWeekView コンポーネント', () => {
  setActivePinia(createPinia())

  it('スナップショットテスト', () => {
    const wrapper = shallowMount(CalendarWeekView, {
      props: {
        start: new Date(2024, 3, 10),
        end: new Date(2024, 3, 16)
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
