<template>
  <ItemModal v-model="store.isShowWhatsnew" full-height>
    <div class="modal">
      <div class="modal__hero">
        <div class="modal__title">{{ store.contentWhatsnew?.title }}</div>
        <div class="modal__date">{{ formatPastDate(store.contentWhatsnew?.date) }}</div>
      </div>
      <div class="modal__content" v-html="store.contentWhatsnew?.text"></div>
      <div class="modal__close">
        <ui-button
          class-name="button--tertiary"
          @click="store.isShowWhatsnew = false"
        >
          Закрыть
        </ui-button>
      </div>
    </div>
  </ItemModal>
</template>

<script setup lang="ts">
import { useItemModalStore } from '@/stores/itemModal'
import { formatPastDate } from '@/helpers'

const store = useItemModalStore()
</script>

<style scoped>
.modal {
  padding-bottom: var(--bottom-spacer-height);
  /* background-color: var(--color-gray-white); */
}

.modal__hero {
  padding: 24px 56px 24px 16px;
  border-radius: 0 0 16px 16px;
  background-color: var(--color-accent-rust);
}

.modal__title {
  font: var(--font-header-h1);
  color: var(--color-gray-white);
}

.modal__date {
  margin-top: 24px;
  font: var(--font-header-h4);
  color: var(--color-gray-white);
}

.modal__content {
  padding: 0 16px;
  transform: translateY(-8px);
}

::v-deep(.modal__content h2) {
  margin: 0;
  padding: 0;
  margin-top: 32px;
  font: 500 18px/18px TTHoves;
  color: var(--color-gray-gray-1);
}

::v-deep(.modal__content p) {
  margin: 0;
  padding: 0;
  margin-top: 16px;
  font: 400 14px/20px TTHoves;
  color: var(--color-gray-gray-3);
}

.modal__close {
  height: 56px;
  margin-top: 32px;
  padding: 0 16px;
}

.modal__close > button {
  position: fixed;
  bottom: var(--bottom-spacer-height);
  left: 16px;
  width: calc(100% - 32px);
}
</style>
