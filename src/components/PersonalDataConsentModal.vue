<template>
  <ItemModal :model-value="itemModalStore.isShowPersonalDataConsent" full-height disable-close>
    <div class="modal">
      <div class="modal__hero">
        <div class="modal__title">
          Перед тем как продолжить…
        </div>
      </div>
      <div class="modal__content">
        <ui-checkbox
          v-model="isConfirmed"
          label="Соглашаюсь на сбор и обработку персональных данных"
        />
      </div>
      <div class="modal__close">
        <ui-button
          v-if="isConfirmed"
          :loading="loading"
          class-name="button--tertiary"
          @click="consent"
        >
          Продолжить
        </ui-button>
      </div>
    </div>
  </ItemModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useItemModalStore } from '@/stores/itemModal'

const authStore = useAuthStore()
const itemModalStore = useItemModalStore()

const isConfirmed = ref(false)
const loading = ref(false)

async function consent() {
  loading.value = true
  try {
    await authStore.consentPersonalData()
    itemModalStore.isShowPersonalDataConsent = false
  } catch (error) {
    
  }
  loading.value = false
}
</script>

<style scoped>
.modal {
  padding-bottom: var(--bottom-spacer-height);
  /* background-color: var(--color-gray-white); */
}

.modal__hero {
  padding: 24px 24px 24px 16px;
  border-radius: 0 0 16px 16px;
  background-color: var(--color-accent-rust);
}

.modal__title {
  font: var(--font-header-h1);
  color: var(--color-gray-white);
}

.modal__content {
  padding: 24px 16px var(--bottom-spacer-height) 16px;
}

.modal__close {
  height: 56px;
  margin-top: 40px;
  padding: 0 16px;
}

.modal__close > button {
  position: fixed;
  bottom: var(--bottom-spacer-height);
  left: 16px;
  width: calc(100% - 32px);
}
</style>
