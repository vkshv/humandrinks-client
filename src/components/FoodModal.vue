<template>
  <ItemModal v-model="store.isShowFood">
    <div class="modal">
      <div
        class="modal__picture"
        :style="{ backgroundImage: `url(${config.STRAPI_URL + store.contentFood?.picture})` }"
      >
        <div class="modal__tags">
          <div v-if="store.contentFood?.new" class="modal__tag">new</div>
        </div>
      </div>
      <div class="modal__price">
        {{ store.contentFood?.price }} ₽
      </div>
      <div class="modal__title">
        {{ store.contentFood?.title }}
      </div>
      <div class="modal__description">
        {{ store.contentFood?.description }}
      </div>
      <div class="modal__energy">
        <div class="">{{ store.contentFood?.energyValue }} ккал</div>
        <div class="">{{ store.contentFood?.proteins }} б</div>
        <div class="">{{ store.contentFood?.fats }} ж</div>
        <div class="">{{ store.contentFood?.carbohydrates }} у</div>
      </div>
      <div class="modal__ingredients">
        <div
          v-for="ingredient in store.contentFood?.ingredients"
          class="modal__ingredient"
        >{{ ingredient }}</div>
      </div>
      <div class="modal__close">
        <ui-button
          class-name="button--tertiary"
          @click="store.isShowFood = false"
        >
          закрыть
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

.modal__energy {
  display: flex;
  column-gap: 8px;
  margin-top: 16px;
  padding: 0 16px;
  font: var(--font-numbers-n2);
  color: var(--color-gray-gray-4);
  letter-spacing: -1.5px;
}

.modal__energy div::after {
  content: '·';
  padding-left: 8px;
}

.modal__energy div:last-child::after {
  display: none;
}

.modal__ingredients {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 16px;
  padding: 0 16px;
}

.modal__ingredient {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 12px;
  border-radius: 12px;
  font: var(--font-caption-c1);
  color: var(--color-gray-gray-1);
  background-color: var(--color-gray-gray-7);
  text-transform: lowercase;
}

.modal__close {
  margin-top: 40px;
  padding: 0 16px;
}
</style>
