<template>
  <ItemModal v-model="store.isShowMerch" full-height>
    <div class="modal">
      <div
        class="modal__picture"
        :style="{ backgroundImage: `url(${store.contentMerch?.picture})` }"
      >
        <div class="modal__tags">
          <div v-if="store.contentMerch && (store.contentMerch?.count < 4)" class="modal__tag">3 осталось</div>
        </div>
      </div>
      <div class="modal__price">
        {{ store.contentMerch?.price || store.contentMerch?.bonusPrice }} ₽
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
          ХОЧУ!
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
  try {
    window.Telegram.WebApp.showConfirm('Мы откроем telegram-чат, а приложение закроется. Продолжить?', (answer: boolean) => {
      if (answer) {
        window.Telegram.WebApp.openTelegramLink(config.MERCH_TG_LINK)
        window.Telegram.WebApp.close()
      }
    })
  } catch (error) {
    // 
  }
  // store.openBonusHowItWorks()
}
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
  font: var(--font-header-h2-secondary);
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
  color: var(--color-gray-gray-3);
  word-break: break-word;
  white-space: pre-wrap;
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
