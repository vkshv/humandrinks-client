<template>
  <ItemModal v-model="store.isShowEventHowItWorks">
    <div class="modal">
      <div class="steps">
        <div class="step">
          <div class="step__number">1</div>
          <div class="step__title">приходи</div>
          <div class="step__text">Is this the real life? Is this just fantasy?</div>
        </div>
        <div class="step">
          <div class="step__number">2</div>
          <div class="step__title">туси</div>
          <div class="step__text">Caught in a landslide, no escape from reality</div>
        </div>
        <div class="step">
          <div class="step__number">3</div>
          <div class="step__title">уходи</div>
          <div class="step__text">Open your eyes, look up to the skies and see</div>
        </div>
      </div>
      <div class="okay">
        <ui-button
          class-name="button--tertiary"
          @click="store.isShowEventHowItWorks = false"
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
  /* background-color: var(--color-gray-white); */
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
  margin-top: 40px;
}
</style>
