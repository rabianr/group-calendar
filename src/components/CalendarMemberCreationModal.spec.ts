import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import CalendarMemberCreationModal from './CalendarMemberCreationModal.vue'
import FormField from './FormField.vue'

describe('CalendarMemberCreationModal コンポーネント', () => {
  const wrapper = mount(CalendarMemberCreationModal, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })]
    },
    props: {
      id: 'testModal'
    }
  })

  const nameField = wrapper.findComponent(FormField)
  const submitBtn = wrapper.find('.modal-footer .btn-primary')

  it('入力バリデーション', async () => {
    // 未入力チェック
    await submitBtn.trigger('click')
    expect(nameField.props('error')).toBeTruthy()

    // 入力済みチェック
    await nameField.setValue('test val')
    expect(nameField.props('error')).toBeFalsy()
    await submitBtn.trigger('click')
    expect(nameField.props('error')).toBeFalsy()
  })

  it('送信イベント発行', async () => {
    expect(wrapper.emitted()).toHaveProperty('submit')
    expect(wrapper.emitted().submit).toHaveLength(1)
    expect(wrapper.emitted().submit[0]).toEqual([null, 'test val'])
  })
})
