import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { i18n } from '@/i18n'
import I18nDateDisplay from './I18nDateDisplay.vue'

describe('I18nDateDisplay コンポーネント', () => {
  const { locale } = i18n.global

  it('日付のフォーマット', () => {
    const wrapper = mount(I18nDateDisplay, {
      props: {
        date: new Date(2024, 3, 10),
        formatStr: 'yyyy-MM-dd'
      }
    })

    expect(wrapper.text()).toBe('2024-04-10')
  })

  it('日本語の日付のフォーマット', () => {
    locale.value = 'ja'

    const wrapper = mount(I18nDateDisplay, {
      props: {
        date: new Date(2024, 3, 10),
        formatStr: 'MMM EEEE'
      }
    })

    expect(wrapper.text()).toBe('4月 水曜日')
  })

  it('英語の日付のフォーマット', () => {
    locale.value = 'en'

    const wrapper = mount(I18nDateDisplay, {
      props: {
        date: new Date(2024, 3, 10),
        formatStr: 'MMM EEEE'
      }
    })

    expect(wrapper.text()).toBe('Apr Wednesday')
  })
})
