<template>
  <ItemModal v-model="store.isShowMerch" full-height>
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
        {{ store.contentMerch?.bonusPrice }}
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3523 1.12969C10.456 1.18742 10.5374 1.27822 10.5835 1.3876C10.6295 1.49698 10.6377 1.61865 10.6066 1.73319L9.19555 6.90615H14.3437C14.4472 6.90616 14.5485 6.93641 14.6351 6.9932C14.7217 7.04999 14.7897 7.13084 14.831 7.2258C14.8722 7.32077 14.8848 7.42571 14.8672 7.52773C14.8496 7.62976 14.8026 7.72441 14.7319 7.80007L7.29438 15.7688C7.21338 15.8558 7.10554 15.9131 6.98812 15.9316C6.8707 15.95 6.75048 15.9286 6.64669 15.8706C6.54291 15.8127 6.46154 15.7216 6.41562 15.612C6.3697 15.5024 6.36187 15.3805 6.39338 15.2659L7.80438 10.0936H2.65622C2.55269 10.0936 2.45141 10.0634 2.36485 10.0066C2.27828 9.94981 2.2102 9.86896 2.16896 9.774C2.12772 9.67903 2.11513 9.57409 2.13274 9.47206C2.15034 9.37004 2.19737 9.27539 2.26805 9.19973L9.70555 1.23098C9.78656 1.14432 9.89425 1.08726 10.0115 1.0689C10.1287 1.05054 10.2486 1.07194 10.3523 1.12969Z" fill="#D45135"/>
        </svg>
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
          Как получить?
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
  store.openBonusHowItWorks()
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
  margin-top: 24px;
  padding: 0 16px;
  font: var(--font-header-h2);
  color: var(--color-accent-rust);
  font-style: italic;
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

.modal__how-to-get {
  height: 56px;
  margin-top: 40px;
  padding: 0 16px;
}

.modal__how-to-get > button {
  position: fixed;
  bottom: var(--bottom-spacer-height);
  left: 16px;
  width: calc(100% - 32px);
}
</style>
