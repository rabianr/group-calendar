import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormFieldSelect from './FormFieldSelect.vue'

describe('FormFieldSelect コンポーネント', () => {
  const wrapper = mount({
    data() {
      return { options: [{ value: 'test val', text: 'Test Option' }], val: '' }
    },
    template: `
      <FormFieldSelect v-model="val" :options="options" error="入力値に誤りがあります">
        <template #label>フィールド名</template>
      </FormFieldSelect>
    `,
    components: { FormFieldSelect }
  })

  it('v-modelが正常に動作する', async () => {
    await wrapper.find('.form-select').setValue('test val')
    expect(wrapper.vm.val).toBe('test val')
  })

  it('レーベルを描画する', () => {
    expect(wrapper.find('.form-label').text()).toContain('フィールド名')
  })

  it('エラーメッセージを描画する', () => {
    expect(wrapper.find('.form-select').classes()).toContain('is-invalid')

    const invalidFeedback = wrapper.find('.invalid-feedback')
    expect(invalidFeedback.exists()).toBe(true)
    expect(invalidFeedback.text()).toBe('入力値に誤りがあります')
  })
})
