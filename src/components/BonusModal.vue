<template>
  <ItemModal v-model="store.isShowBonus">
    <div class="modal">
      <div class="title">Бонусы</div>
      <div class="card">
        <div class="card__count">
          <span>{{ authStore.userRegData.bonus }}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.615 1.59486C14.7614 1.67635 14.8763 1.80454 14.9413 1.95896C15.0064 2.11338 15.0179 2.28515 14.974 2.44686L12.982 9.74986H20.25C20.3961 9.74987 20.5391 9.79258 20.6613 9.87276C20.7835 9.95293 20.8796 10.0671 20.9378 10.2011C20.9961 10.3352 21.0138 10.4834 20.989 10.6274C20.9641 10.7714 20.8977 10.9051 20.798 11.0119L10.298 22.2619C10.1836 22.3847 10.0313 22.4655 9.86558 22.4916C9.69981 22.5177 9.53009 22.4874 9.38357 22.4056C9.23705 22.3238 9.12218 22.1952 9.05735 22.0405C8.99252 21.8857 8.98146 21.7137 9.02595 21.5519L11.018 14.2499H3.74995C3.60379 14.2498 3.46082 14.2071 3.33861 14.127C3.2164 14.0468 3.12028 13.9326 3.06206 13.7986C3.00384 13.6645 2.98607 13.5164 3.01092 13.3723C3.03578 13.2283 3.10217 13.0947 3.20195 12.9879L13.702 1.73786C13.8163 1.6155 13.9683 1.53495 14.1338 1.50903C14.2993 1.48312 14.4687 1.51333 14.615 1.59486Z" fill="white"/>
          </svg>
        </div>
        <div class="card__number">
          <span v-if="authStore.userRegData.cardNumber">№ {{ authStore.userRegData.cardNumber }}</span>
        </div>
        <div class="card__add-card">
          <ui-button
            class-name="button--secondary-3"
            @click="add"
          >
            Добавить карту в кошелёк
          </ui-button>
        </div>
        <div class="card__promo">
          <PromocodeField
            v-model="promocode"
            :error="promocode_error"
            :success="promocode_success"
            :processing="promocode_processing"
            placeholder="Промокод"
            @input="inputPromocodeHandler"
            @apply="applyPromocodeHandler"
          />
        </div>
      </div>
      <div v-if="promocode_error" class="promo-error">{{ promocode_error }}</div>
      <div v-if="promocode_success" class="promo-success">{{ promocode_success }}</div>
      <div
        class="how-it-works"
        @click="showHowItWorks"
      >Как работают бонусы?</div>
      <div class="close">
        <ui-button
          class-name="button--tertiary"
          @click="store.isShowBonus = false"
        >
          Закрыть
        </ui-button>
      </div>
    </div>
  </ItemModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useItemModalStore } from '@/stores/itemModal'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import PromocodeField from '@/components/PromocodeField.vue'

const store = useItemModalStore()
const authStore = useAuthStore()
const appStore = useAppStore()

const promocode = ref('')
const promocode_error = ref('')
const promocode_success = ref('')
const promocode_processing = ref(false)

function copy() {}

function add() {}

function inputPromocodeHandler() {}

async function applyPromocodeHandler() {
  promocode_processing.value = true
  appStore.loader = true
  try {
    const response = await authStore.redeemPromocode(promocode.value)
    promocode.value = ''
    promocode_error.value = ''
    promocode_success.value = ''
    if (response.data.bonus) {
      promocode_success.value = `Промокод применён: +${response.data.bonus} бонусов`
    }
  } catch (error) {
    promocode_error.value = 'Промокод недействителен или истек'
    promocode_success.value = ''
  }
  promocode_processing.value = false
  appStore.loader = false
}

function showHowItWorks() {
  store.openBonusHowItWorks()
}
</script>

<style scoped>
.modal {
  padding: 24px 16px var(--bottom-spacer-height) 16px;
  background-color: var(--color-gray-white);
}

.title {
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
  text-align: center;
}

.card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: max-content 1fr max-content;
  height: 221px;
  margin-top: 16px;
  padding: 4px;
  border-radius: 16px;
  background-color: var(--color-accent-rust);
}

.card__count {
  display: flex;
  column-gap: 6px;
  margin: 12px 0 0 12px;
  font: italic 700 64px/56px TTDrugs;
  color: var(--color-gray-white);
}

.card__number {
  align-self: start;
  justify-self: end;
  margin: 12px 12px 0 0;
  font: var(--font-body-b2-bold);
  color: var(--color-gray-white);
}

.card__add-card {
  grid-column: 1 / 3;
  align-self: end;
  justify-self: center;
  width: fit-content;
}

.card__promo {
  grid-column: 1 / 3;
  margin-top: 36px;
}

.promo-error {
  margin-top: 16px;
  font: var(--font-caption-c1);
  color: var(--color-accent-rust);
  text-align: center;
}

.promo-success {
  margin-top: 16px;
  font: var(--font-caption-c1);
  color: var(--color-accent-green);
  text-align: center;
}

.how-it-works {
  margin-top: 72px;
  font: var(--font-body-b2-bold);
  color: var(--color-gray-gray-4);
  text-align: center;
}

.close {
  height: 56px;
  margin-top: 24px;
}

.close > button {
  position: fixed;
  bottom: var(--bottom-spacer-height);
  left: 16px;
  width: calc(100% - 32px);
}
</style>
