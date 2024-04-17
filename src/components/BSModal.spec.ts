import { describe, expect, it } from 'vitest'
import BSModal from './BSModal.vue'
import { mount } from '@vue/test-utils'

describe('BSModalコンポーネント', () => {
  it('イベント発行', async () => {
    const wrapper = mount(BSModal, {
      props: {
        id: 'testModal'
      }
    })

    // submitイベント発行
    const btnPrimary = wrapper.find('.modal-footer .btn-primary')
    await btnPrimary.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('submit')
    expect(wrapper.emitted().submit).toHaveLength(1)

    // hiddenイベント発行
    const modal = wrapper.find('.modal')
    await modal.element.dispatchEvent(new Event('hidden.bs.modal'))
    expect(wrapper.emitted()).toHaveProperty('hidden')
    expect(wrapper.emitted().hidden).toHaveLength(1)
  })
})
