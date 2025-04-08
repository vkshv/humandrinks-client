<template>
  <ItemModal v-model="store.isShowMerchHowItWorks">
    <div class="modal">
      <div class="steps">
        <div class="step">
          <div class="step__number">1</div>
          <div class="step__title">копи</div>
          <div class="step__text">копите бонусы: за каждую покупку в роботах вы получаете 5%</div>
        </div>
        <div class="step">
          <div class="step__number">2</div>
          <div class="step__title">успевай</div>
          <div class="step__text">включите уведомления о новых дропах</div>
        </div>
        <div class="step">
          <div class="step__number">3</div>
          <div class="step__title">обменивай</div>
          <div class="step__text">выбирайте и обменивайте бонусы на мерч в Роботах</div>
        </div>
      </div>
      <div class="okay">
        <ui-button
          class-name="button--tertiary"
          @click="store.isShowMerchHowItWorks = false"
        >
          ясно!
        </ui-button>
      </div>
    </div>
  </ItemModal>
</template>

<script setup lang="ts">
import { useItemModalStore } from '@/stores/itemModal'

const store = useItemModalStore()
</script>

<style scoped>
.modal {
  padding: 24px 16px var(--bottom-spacer-height) 16px;
  background-color: var(--color-gray-white);
}

.steps {
  display: grid;
  row-gap: 48px;
}

.step {
  display: grid;
}

.step__number {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  font: 900 18px/18px TTDrugs;
  color: var(--color-gray-gray-1);
  background-color: var(--color-gray-gray-7);
}

.step__title {
  margin-top: 16px;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
  text-align: center;
}

.step__text {
  justify-self: center;
  max-width: 264px;
  margin-top: 8px;
  font: var(--font-body-b2);
  color: var(--color-gray-gray-1);
  text-align: center;
}

.okay {
  height: 56px;
  margin-top: 40px;
}

.okay > button {
  position: fixed;
  bottom: var(--bottom-spacer-height);
  left: 16px;
  width: calc(100% - 32px);
}
</style>
