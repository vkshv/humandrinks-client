<template>
  <ItemModal v-model="store.isShowMerch">
    <div class="modal">
      <div
        class="modal__picture"
        :style="{ backgroundImage: `url(${config.STRAPI_URL + store.contentMerch?.picture})` }"
      >
        <div class="modal__tags">
          <div v-if="store.contentMerch && (store.contentMerch?.count < 4)" class="modal__tag">3 осталось</div>
        </div>
      </div>
      <div class="modal__price">
        {{ store.contentMerch?.price }} ₽
      </div>
      <div class="modal__title">
        {{ store.contentMerch?.title }}
      </div>
      <div class="modal__description">
        {{ store.contentMerch?.description }}
      </div>
      <div class="modal__how-to-get">
        <ui-button
          class-name="button--primary"
          @click="howToGet"
        >
          как получить?
        </ui-button>
      </div>
    </div>
  </ItemModal>
</template>

<script setup lang="ts">
import { useItemModalStore } from '@/stores/itemModal'
import config from '@/config'

const store = useItemModalStore()

function howToGet() {
  store.openMerchHowItWorks()
}
</script>

<style scoped>
.modal {
  padding-bottom: var(--bottom-spacer-height);
  border-radius: 16px 16px 0 0;
  background-color: var(--color-gray-white);
}

.modal__picture {
  position: relative;
  border-radius: 16px;
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
  margin-top: 2px;
  padding: 0 16px;
  font: var(--font-header-h3);
  color: var(--color-gray-gray-1);
  text-transform: lowercase;
}

.modal__description {
  margin-top: 16px;
  padding: 0 16px;
  font: var(--font-body-b2);
  color: var(--color-gray-gray-1);
  text-transform: lowercase;
}

.modal__how-to-get {
  margin-top: 40px;
  padding: 0 16px;
}
</style>
