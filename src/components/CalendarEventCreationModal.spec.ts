import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import CalendarEventCreationModal from './CalendarEventCreationModal.vue'
import FormFieldDateRange from './FormFieldDateRange.vue'
import FormFieldTextarea from './FormFieldTextarea.vue'
import FormFieldSelect from './FormFieldSelect.vue'
import FormField from './FormField.vue'

describe('CalendarEventCreationModal コンポーネント', () => {
  setActivePinia(createPinia())

  const wrapper = mount(CalendarEventCreationModal, {
    props: {
      id: 'testModal'
    }
  })
  const eventDateField = wrapper.findComponent<typeof FormFieldDateRange>('[data-test="date"]')
  const memberField = wrapper.findComponent<typeof FormFieldSelect>('[data-test="member"]')
  const titleField = wrapper.findComponent<typeof FormField>('[data-test="title"]')
  const detailField = wrapper.findComponent<typeof FormFieldTextarea>('[data-test="detail"]')
  const submitBtn = wrapper.find('.modal-footer .btn-primary')

  it('入力バリデーション', async () => {
    // 未入力チェック
    await submitBtn.trigger('click')
    expect(eventDateField.props('error')).toBeTruthy()
    expect(memberField.props('error')).toBeTruthy()
    expect(titleField.props('error')).toBeTruthy()

    // 入力済みチェック
    await eventDateField.setValue('2024-04-10', 'start')
    await eventDateField.setValue('2024-04-10', 'end')
    await memberField.setValue('山田花子')
    await titleField.setValue('テスト')
    await detailField.setValue('テスト内容')
    await submitBtn.trigger('click')
    expect(eventDateField.props('error')).toBeFalsy()
    expect(memberField.props('error')).toBeFalsy()
    expect(titleField.props('error')).toBeFalsy()
  })

  it('送信イベント発行', () => {
    expect(wrapper.emitted()).toHaveProperty('submit')
    expect(wrapper.emitted().submit).toHaveLength(1)
    expect(wrapper.emitted().submit[0]).toEqual([
      null,
      '山田花子',
      {
        detail: 'テスト内容',
        end: '2024-04-10',
        start: '2024-04-10',
        title: 'テスト'
      }
    ])
  })
})
