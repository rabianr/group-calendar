<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps<{
  id: string
}>()

const emit = defineEmits<{
  submit: [modal: Modal]
  hidden: []
}>()

const modalRef = ref()
const modalTitleId = `${props.id}Label`

onMounted(() => {
  modalRef.value.addEventListener('hidden.bs.modal', () => {
    emit('hidden')
  })
})

const submit = () => {
  emit('submit', Modal.getInstance(modalRef.value)!)
}
</script>

<template>
  <div
    ref="modalRef"
    :id="id"
    class="modal fade"
    tabindex="-1"
    :aria-labelledby="modalTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" :id="modalTitleId">
            <slot name="modalTitle" />
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            :aria-label="$t('Close')"
          />
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <slot name="modalFooter">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              {{ $t('Cancel') }}
            </button>
            <button type="button" class="btn btn-primary" @click="submit">
              {{ $t('Submit') }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
