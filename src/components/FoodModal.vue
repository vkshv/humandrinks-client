<template>
  <ItemModal v-model="store.isShowFood" full-height>
    <div class="modal">
      <div
        class="modal__picture"
        :style="{ backgroundImage: `url(${store.contentFood?.picture})` }"
      >
        <div class="modal__tags">
          <div v-if="store.contentFood?.new" class="modal__tag">new</div>
          <div v-if="store.contentFood?.spicy" class="modal__tag modal__tag-icon">
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.43859 4.58734C6.58598 3.79542 6.68916 2.7184 6.39437 1.92648C6.36489 1.84729 6.26171 1.84729 6.23223 1.92648C5.92269 2.62337 5.53945 3.1302 5.18569 3.43113C5.18569 3.43113 5.30361 1.26126 4.0065 0.0258588C3.94754 -0.0374952 3.8591 0.0258588 3.87384 0.105051C3.96228 0.738591 3.84436 1.56219 3.59378 2.14822C3.09263 3.27275 3.24003 3.92213 3.24003 3.92213C3.24003 3.92213 2.48829 3.30443 2.67991 2.05319C2.69465 1.97399 2.59147 1.91064 2.53251 1.97399C1.98713 2.57586 1.44176 3.57368 1.91343 5.09418C2.34089 6.44045 2.11979 6.74138 1.81025 6.45629C1.57442 6.23455 1.22066 5.82275 1.1617 4.98331C1.14696 4.88828 1.04378 4.87244 0.99956 4.93579C0.9406 5.03082 0.89638 5.12585 0.852161 5.22088C0.262564 6.55132 0.616322 7.99262 1.47124 8.95877C3.65274 7.94511 5.24465 6.15536 6.43859 4.58734Z" fill="#D45135"/>
              <path d="M13.5278 2.78395C12.496 2.79979 11.7885 3.24327 11.3758 3.60755C11.3168 3.59172 11.2579 3.5442 11.1989 3.52836C10.8009 3.36998 10.3735 3.35414 9.99023 3.48085C10.2998 3.84513 10.5209 4.39948 10.683 5.08053C10.9925 5.11221 11.361 5.20724 11.7148 5.34979C11.9801 5.46066 12.2012 5.58736 12.3634 5.72991C12.4371 5.20724 12.3339 4.71625 12.0833 4.30445C12.3781 4.06687 12.8645 3.81345 13.5278 3.81345C13.7931 3.79762 13.9995 3.59172 13.9995 3.29078C13.9995 3.00569 13.7931 2.76811 13.5278 2.78395Z" fill="#D45135"/>
              <path d="M10.3446 5.94878C10.1235 5.93294 9.94662 5.75872 9.91714 5.52114C9.74026 4.57083 9.12119 2.4168 7.2787 4.8876C5.65731 7.07331 3.56424 9.33822 0.527818 10.2885C-0.209177 10.5261 -0.164957 11.6665 0.601518 11.7932C4.61077 12.4426 7.41136 11.5556 10.4773 9.16399C13.779 6.58232 11.3469 6.05965 10.3446 5.94878Z" fill="#D45135"/>
            </svg>
          </div>
          <div v-if="store.contentFood?.vegan" class="modal__tag modal__tag-icon">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.117156 10.8485L0.12047 10.8433C0.565702 10.1284 1.04395 9.43199 1.54858 8.76871C2.05388 8.10469 2.58808 7.47007 3.15197 6.87238C4.2266 5.73595 5.41353 4.72523 6.71356 3.968C4.49894 4.62729 1.66194 7.36105 1.66194 7.36105C1.62813 4.9474 2.06926 3.02493 3.94021 1.86693C5.73016 0.759003 7.5083 0.663721 9.58079 0.578928C11.0088 0.520282 12 0 12 0C11.6639 1.87638 11.0896 5.86196 8.70306 7.85622C6.21238 9.93735 3.06592 9.02678 2.68009 8.90402C2.57163 9.08159 2.46517 9.26048 2.36095 9.44085C1.95603 10.1424 1.58518 10.8611 1.24296 11.6022C1.23037 11.6291 1.21433 11.6591 1.19841 11.6848C0.991179 12.0174 0.581215 12.1 0.282626 11.869C-0.015831 11.6381 -0.0899467 11.1812 0.117156 10.8485Z" fill="#7A9A2D"/>
            </svg>
          </div>
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
        <div v-if="store.contentFood?.weight">{{ store.contentFood?.weight }} г</div>
        <div v-if="store.contentFood?.energyValue">{{ store.contentFood?.energyValue }} Ккал</div>
        <div v-if="store.contentFood?.proteins">{{ store.contentFood?.proteins }}Б</div>
        <div v-if="store.contentFood?.fats">{{ store.contentFood?.fats }}Ж</div>
        <div v-if="store.contentFood?.carbohydrates">{{ store.contentFood?.carbohydrates }}У</div>
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
  /* background-color: var(--color-gray-white); */
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
  display: flex;
  column-gap: 2px;
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

.modal__tag-icon {
  justify-content: center;
  width: 24px;
  padding: 0;
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

.modal__energy {
  display: flex;
  column-gap: 8px;
  margin-top: 24px;
  padding: 0 16px;
  font: var(--font-body-b3);
  color: var(--color-gray-gray-4);
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
