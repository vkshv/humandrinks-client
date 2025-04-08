<template>
  <ItemModal v-model="store.isShowEvent">
    <div class="modal">
      <div
        class="modal__picture"
        :style="{ backgroundImage: `url(${config.STRAPI_URL + store.contentEvent?.picture})` }"
      >
        <div class="modal__tags">
          <div v-if="store.contentEvent?.almostFull" class="modal__tag">мало мест</div>
        </div>
      </div>
      <div class="modal__price">
        <div class="">{{ store.contentEvent?.price }} ₽</div>
        <template v-if="store.contentEvent?.bonusPayment">
          <div class="modal__price-separator">/</div>
          <div class="modal__price-bonus">
            {{ store.contentEvent?.bonusPrice }}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.7433 1.06324C9.84092 1.11757 9.91752 1.20303 9.9609 1.30597C10.0043 1.40892 10.0119 1.52343 9.98264 1.63124L8.65464 6.49991H13.5C13.5974 6.49991 13.6927 6.52839 13.7742 6.58184C13.8557 6.63529 13.9198 6.71138 13.9586 6.80075C13.9974 6.89013 14.0092 6.9889 13.9927 7.08493C13.9761 7.18095 13.9318 7.27004 13.8653 7.34124L6.8653 14.8412C6.78906 14.9231 6.68757 14.977 6.57705 14.9944C6.46654 15.0118 6.35339 14.9916 6.25571 14.9371C6.15803 14.8825 6.08145 14.7968 6.03823 14.6936C5.99501 14.5905 5.98764 14.4758 6.0173 14.3679L7.3453 9.4999H2.49997C2.40253 9.4999 2.30721 9.47142 2.22574 9.41797C2.14426 9.36452 2.08018 9.28843 2.04137 9.19906C2.00256 9.10968 1.99071 9.01091 2.00728 8.91488C2.02385 8.81886 2.06812 8.72977 2.13464 8.65857L9.13464 1.15857C9.21088 1.077 9.31223 1.0233 9.42254 1.00602C9.53285 0.988746 9.64577 1.00889 9.7433 1.06324Z" fill="#D45135"/>
            </svg>
          </div>
        </template>
      </div>
      <div class="modal__title">
        {{ store.contentEvent?.title }}
      </div>
      <div class="modal__info">
        <div class="">{{ formatDate(store.contentEvent?.date) }}</div>
        <div class="">{{ store.contentEvent?.time }}</div>
        <div class="">{{ store.contentEvent?.category }}</div>
      </div>
      <div class="modal__description">
        {{ store.contentEvent?.description }}
      </div>
      <div class="modal__extra">
        <div
          v-for="item in extra"
          class="modal__extra-item"
        >{{ item }}</div>
      </div>
      <div class="modal__action">
        <ui-button
          class-name="button--primary"
          @click="reserve"
        >
          забронировать
        </ui-button>
      </div>
    </div>
  </ItemModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useItemModalStore } from '@/stores/itemModal'
import { formatDate } from '@/helpers'
import config from '@/config'
import router from '@/router'

const store = useItemModalStore()

const extra = computed(() => {
  const _ = []
  _.push(`вход ${store.contentEvent?.price} ₽`)
  if (store.contentEvent?.bonusPayment) _.push('можно баллами')
  return _
})

function reserve() {
  store.isShowEvent = false
  router.push({
    name: 'app-reserve',
    query: {
      event: store.contentEvent?.documentId
    }
  })
}
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
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin-top: 24px;
  padding: 0 16px;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
}

.modal__price-separator {
  color: var(--color-gray-gray-5);
}

.modal__price-bonus {
  color: var(--color-accent-rust);
}

.modal__title {
  margin-top: 2px;
  padding: 0 16px;
  font: var(--font-header-h3);
  color: var(--color-gray-gray-1);
  text-transform: lowercase;
}

.modal__description {
  margin-top: 24px;
  padding: 0 16px;
  font: var(--font-body-b2);
  color: var(--color-gray-gray-1);
  text-transform: lowercase;
}

.modal__info {
  display: flex;
  column-gap: 8px;
  margin-top: 24px;
  padding: 0 16px;
  font: var(--font-body-b2);
  color: var(--color-gray-gray-1);
}

.modal__info div::after {
  content: '·';
  padding-left: 8px;
}

.modal__info div:last-child::after {
  display: none;
}

.modal__extra {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 16px;
  padding: 0 16px;
}

.modal__extra-item {
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

.modal__action {
  margin-top: 40px;
  padding: 0 16px;
}
</style>
