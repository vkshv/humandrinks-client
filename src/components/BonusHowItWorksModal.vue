<template>
  <ItemModal v-model="store.isShowBonusHowItWorks">
    <div class="modal">
      <div class="title">Бонусы</div>
      <div class="steps">
        <div class="step">
          <div class="step__number">
            <span>1</span>
          </div>
          <div class="step__title">Копи</div>
          <div class="step__text">За каждый оплаченный счёт в Роботах <br/> вы получаете 5% бонусов</div>
        </div>
        <div class="step">
          <div class="step__number">
            <span>2</span>
          </div>
          <div class="step__title">Обменивай</div>
          <div class="step__text">Обменивай бонусы на мерч, билеты, <br/> еду или напитки в Роботах</div>
        </div>
      </div>
      <div class="okay">
        <ui-button
          class-name="button--tertiary"
          @click="store.isShowBonusHowItWorks = false"
        >
          Ясно!
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
  /* background-color: var(--color-gray-white); */
}

.title {
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
  text-align: center;
}

.steps {
  margin-top: 64px;
  display: grid;
  row-gap: 40px;
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
  font: 900 24px/24px TTDrugs;
  color: var(--color-gray-gray-1);
  background-color: var(--color-gray-gray-7);
}

.step__number > span {
  transform: translateY(2px);
}

.step__title {
  margin-top: 16px;
  font: 500 20px/20px TTHoves;
  color: var(--color-gray-gray-1);
  text-align: center;
}

.step__text {
  justify-self: center;
  margin-top: 10px;
  font: var(--font-body-b2);
  color: var(--color-gray-gray-1);
  text-align: center;
}

.okay {
  height: 56px;
  margin-top: 64px;
}

.okay > button {
  position: fixed;
  bottom: var(--bottom-spacer-height);
  left: 16px;
  width: calc(100% - 32px);
}
</style>
