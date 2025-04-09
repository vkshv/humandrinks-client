<template>
  <ItemModal v-model="store.isShowDrink" full-height>
    <div class="modal">
      <div
        class="modal__picture"
        :style="{ backgroundImage: `url(${store.contentDrink?.picture})` }"
      >
        <div class="modal__tags">
          <div v-if="store.contentDrink?.new" class="modal__tag">new</div>
        </div>
      </div>
      <div class="modal__price">
        {{ store.contentDrink?.price }} ₽
      </div>
      <div class="modal__title">
        {{ store.contentDrink?.title }}
      </div>
      <div class="modal__description">
        {{ store.contentDrink?.description }}
      </div>
      <div class="modal__volume">
        <div class="">Объём {{ store.contentDrink?.volume }} мл</div>
      </div>
      <div class="modal__close">
        <ui-button
          class-name="button--tertiary"
          @click="store.isShowDrink = false"
        >
          Закрыть
        </ui-button>
      </div>
    </div>
  </ItemModal>
</template>

<script setup lang="ts">
import { useItemModalStore } from '@/stores/itemModal'
import config from '@/config'

const store = useItemModalStore()
</script>

<style scoped>
.modal {
  padding-bottom: var(--bottom-spacer-height);
  background-color: var(--color-gray-white);
}

.modal__picture {
  position: relative;
  border-radius: 0 0 16px 16px;
  aspect-ratio: 1 / 1;
  background-position: 50% 50%;
  background-size: cover;
}

.modal__tags {
  position: absolute;
  left: 4px;
  bottom: 4px;
}

.modal__tag {
  display: flex;
  align-items: center;
  height: 24px;
  padding: 0 8px;
  border-radius: 24px;
  font: var(--font-body-b2-bold);
  color: var(--color-gray-gray-1);
  background-color: var(--color-gray-white);
}

.modal__price {
  margin-top: 24px;
  padding: 0 16px;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
}

.modal__title {
  margin-top: 4px;
  padding: 0 16px;
  font: var(--font-header-h4);
  color: var(--color-gray-gray-1);
}

.modal__description {
  margin-top: 12px;
  padding: 0 16px;
  font: var(--font-body-b3);
  color: var(--color-gray-gray-1);
}

.modal__volume {
  margin-top: 24px;
  padding: 0 16px;
  font: var(--font-body-b3);
  color: var(--color-gray-gray-4);
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
