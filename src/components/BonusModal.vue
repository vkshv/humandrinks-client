<template>
  <ItemModal v-model="store.isShowBonus">
    <div class="modal">
      <div class="title">бонусы</div>
      <div class="card">
        <div class="card__count">
          <span>{{ authStore.userRegData.bonus }}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.7433 1.06324C9.84092 1.11757 9.91752 1.20303 9.9609 1.30597C10.0043 1.40892 10.0119 1.52343 9.98264 1.63124L8.65464 6.49991H13.5C13.5974 6.49991 13.6927 6.52839 13.7742 6.58184C13.8557 6.63529 13.9198 6.71138 13.9586 6.80075C13.9974 6.89013 14.0092 6.9889 13.9927 7.08493C13.9761 7.18095 13.9318 7.27004 13.8653 7.34124L6.8653 14.8412C6.78906 14.9231 6.68757 14.977 6.57705 14.9944C6.46654 15.0118 6.35339 14.9916 6.25571 14.9371C6.15803 14.8825 6.08145 14.7968 6.03823 14.6936C5.99501 14.5905 5.98764 14.4758 6.0173 14.3679L7.3453 9.4999H2.49997C2.40253 9.4999 2.30721 9.47142 2.22574 9.41797C2.14426 9.36452 2.08018 9.28843 2.04137 9.19906C2.00256 9.10968 1.99071 9.01091 2.00728 8.91488C2.02385 8.81886 2.06812 8.72977 2.13464 8.65857L9.13464 1.15857C9.21088 1.077 9.31223 1.0233 9.42254 1.00602C9.53285 0.988746 9.64577 1.00889 9.7433 1.06324Z" fill="#F9D61C"/>
          </svg>
        </div>
        <div class="card__count-title">бонусов</div>
        <div class="card__add-card">
          <ui-button
            class-name="button--secondary-3"
            @click="add"
          >
            добавить в кошелёк
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
      <div class="referral">
        <div class="referral__title">подарок за друга</div>
        <div class="referral__info">скопируйте ссылку и отправьте тому, кому хочется посоветовать роботы</div>
        <div class="referral__copy">
          <ui-button
            class-name="button--success"
            @click="copy"
          >
            скопировать ссылку
          </ui-button>
        </div>
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
      promocode_success.value = `промокод применён: +${response.data.bonus} бонусов`
    }
  } catch (error) {
    promocode_error.value = 'промокод недействителен или истёк'
    promocode_success.value = ''
  }
  promocode_processing.value = false
  appStore.loader = false
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
  margin-top: 16px;
  padding: 8px;
  border-radius: 16px;
  background-color: var(--color-accent-rust);
}

.card__count {
  display: flex;
  column-gap: 6px;
  margin: 16px 0 0 16px;
  font: 700 48px/48px TTDrugs;
  color: var(--color-accent-yellow);
}

.card__count-title {
  margin: 0 0 0 16px;
  font: var(--font-body-b1);
  color: var(--color-gray-white);
}

.card__add-card {
  width: fit-content;
  margin: 12px 0 0 16px;
}

.card__promo {
  margin-top: 36px;
}

.referral {
  margin-top: 64px;
}

.referral__title {
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
  text-align: center;
}

.referral__info {
  margin-top: 16px;
  font: var(--font-body-b2);
  color: var(--color-gray-gray-1);
  text-align: center;
}

.referral__copy {
  margin-top: 32px;
}
</style>
