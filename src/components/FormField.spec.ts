import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormField from './FormField.vue'

describe('FormField コンポーネント', () => {
  const wrapper = mount({
    data() {
      return { val: '' }
    },
    template: `
      <FormField v-model="val" error="入力値に誤りがあります">
        <template #label>フィールド名</template>
      </FormField>
    `,
    components: { FormField }
  })

  it('v-modelが正常に動作する', async () => {
    await wrapper.find('.form-control').setValue('test val')
    expect(wrapper.vm.val).toBe('test val')
  })

  it('レーベルを描画する', () => {
    expect(wrapper.find('.form-label').text()).toContain('フィールド名')
  })

  it('エラーメッセージを描画する', () => {
    expect(wrapper.find('.form-control').classes()).toContain('is-invalid')

    const invalidFeedback = wrapper.find('.invalid-feedback')
    expect(invalidFeedback.exists()).toBe(true)
    expect(invalidFeedback.text()).toBe('入力値に誤りがあります')
  })
})
