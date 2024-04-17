import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormFieldDateRange from './FormFieldDateRange.vue'

describe('FormFieldDateRange コンポーネント', () => {
  const wrapper = mount({
    data() {
      return { start: '', end: '' }
    },
    template: `
      <FormFieldDateRange v-model:start="start" v-model:end="end" error="入力値に誤りがあります">
        <template #label>フィールド名</template>
      </FormFieldDateRange>
    `,
    components: { FormFieldDateRange }
  })

  it('v-modelが正常に動作する', async () => {
    const formControls = wrapper.findAll('.form-control')
    await formControls[0].setValue('2024-04-12')
    await formControls[1].setValue('2024-04-13')
    expect(wrapper.vm.start).toBe('2024-04-12')
    expect(wrapper.vm.end).toBe('2024-04-13')
  })

  it('レーベルを描画する', () => {
    expect(wrapper.find('.form-label').text()).toContain('フィールド名')
  })

  it('エラーメッセージを描画する', () => {
    expect(wrapper.find('.input-group').classes()).toContain('is-invalid')

    const invalidFeedback = wrapper.find('.invalid-feedback')
    expect(invalidFeedback.exists()).toBe(true)
    expect(invalidFeedback.text()).toBe('入力値に誤りがあります')
  })
})
