<template>
  <ItemModal v-model="store.isShowFeedback" full-height>
    <div class="modal">
      <div class="modal__hero">
        <div class="modal__title">
          Есть вопрос или идея?<br/>
          Пиши, не стесняйся!
        </div>
      </div>
      <div class="modal__content"></div>
    </div>
  </ItemModal>
</template>

<script setup lang="ts">
import { useItemModalStore } from '@/stores/itemModal'

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

.modal__content {
  padding: 8px 16px var(--bottom-spacer-height) 16px;
}
</style>
