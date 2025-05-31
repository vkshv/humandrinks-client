<template>
  <ItemModal v-model="store.isShowBonus" full-height>
    <div class="modal">
      <div class="title">Бонусная система</div>
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
          <!-- <ui-button
            class-name="button--secondary-3"
            @click="add"
          >
            Добавить карту в кошелёк
          </ui-button> -->
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
        v-if="authStore.userRegData.referralProgram?.activated === false && referralProgramCountdown > 0"
        class="referral-program"
        @click="store.isShowReferralBonus = true"
      >
        <div
          class="referral-program__picture"
          :style="{ backgroundImage: `url(${authStore.referralProgram?.referral_picture})` }"
        ></div>
        <div class="referral-program__title">
          {{ authStore.referralProgram?.referral_title }}
        </div>
        <div :class="{
          'referral-program__countdown': true,
          [referralProgramCountdownClassName]: true
        }">
          Осталось {{ referralProgramCountdown }} {{ pluralize(referralProgramCountdown, 'день', 'дня', 'дней') }}
        </div>
        <div class="referral-program__action">
          <ui-button class-name="button--secondary-3">
            Получить
          </ui-button>
        </div>
      </div>

      <div class="invite-user" v-if="authStore.userRegData.isAdmin">
        <div class="invite-user__title">Приглашай друзей!</div>
        <div class="invite-user__invited-count">Друзей приведено: {{ authStore.userRegData.referralsCount }}</div>
        <div
          class="invite-user__qr"
          :style="{ backgroundImage: `url(${qrDataURL})` }"
        ></div>
        <div class="invite-user__copy-link">
          <ui-button
            class-name="button--secondary-compact"
            @click="copyRefLink"
          >
            Поделиться
          </ui-button>
        </div>
      </div>
      <div
        class="how-it-works"
        @click="showHowItWorks"
      >Как работает бонусная система?</div>

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
import { ref, computed, watch } from 'vue'
// @ts-ignore
import QRCode from 'qrcode'
import { useItemModalStore } from '@/stores/itemModal'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { useNotificationsStore } from '@/stores/notifications'
import PromocodeField from '@/components/PromocodeField.vue'
import config from '@/config'
import { pluralize } from '@/helpers'

const store = useItemModalStore()
const authStore = useAuthStore()
const appStore = useAppStore()
const notificationsStore = useNotificationsStore()

const promocode = ref('')
const promocode_error = ref('')
const promocode_success = ref('')
const promocode_processing = ref(false)

const qrDataURL = ref('')

const referralProgramCountdown = computed(() => {
  const createdDate = new Date(authStore.userRegData.createdAt ?? '1970-01-01T00:00:00.000Z')
  const expireDate = new Date(createdDate)
  expireDate.setDate(expireDate.getDate() + 30)

  const now = new Date()
  const diffMs = +expireDate - +now
  return Math.max(Math.ceil(diffMs / (1000 * 60 * 60 * 24)), 0)
})

const referralProgramCountdownClassName = computed(() => {
  if (referralProgramCountdown.value <= 5) return 'referral-program__countdown_danger'
  if (referralProgramCountdown.value <= 15) return 'referral-program__countdown_warning'
  return ''
})

watch(() => store.isShowBonus, (value) => {
  if (value) {
    const qrData = config.TG_APP_URL + '?startapp=referral_code=' + authStore.userRegData.referralCode as string
    QRCode.toDataURL(qrData, {
      color: {
        dark: '#FFFFFF',
        light: '#D45135'
      },
      margin: 0,
      width: 640
    })
      .then((dataURL: string) => {
        qrDataURL.value = dataURL
      })
  }
})

function copy() {}

function add() {}

function inputPromocodeHandler() {}

async function applyPromocodeHandler() {
  promocode_processing.value = true
  // appStore.loader = true
  try {
    const response = await authStore.redeemPromocode(promocode.value)
    promocode.value = ''
    promocode_error.value = ''
    promocode_success.value = ''
    if (response.data.bonus) {
      try {
        const initData = window.Telegram.WebApp.initData
        await authStore.getUser(initData)
      } catch (error) {}
      promocode_success.value = `Промокод применён: +${response.data.bonus} бонусов`
    }
  } catch (error) {
    promocode_error.value = 'Промокод недействителен или истёк'
    promocode_success.value = ''
  }
  promocode_processing.value = false
  // appStore.loader = false
}

function showHowItWorks() {
  store.openBonusHowItWorks()
}

function copyRefLink() {
  try {
    navigator.clipboard.writeText(`Мы уже залетели в «Роботов», гоу с нами? Регистрируйся и получи свой первый авторский коктейль за счёт заведения 🤖🍸
    ${config.TG_APP_URL}?startapp=referral_code=${authStore.userRegData.referralCode}`)

    window.Telegram.WebApp.showPopup({ message: 'Ссылка скопирована. Поделись ей с друзьями!' })
  } catch (error) {}
}
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

.card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: max-content 1fr max-content;
  height: 221px;
  margin-top: 16px;
  padding: 4px;
  border-radius: 16px;
  background-image: url('../assets/card.jpg');
  background-position: center center;
  background-size: cover;
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

.referral-program {
  display: grid;
  grid-template-columns: 80px 1fr max-content;
  grid-template-rows: 1fr max-content;
  column-gap: 16px;
  height: 80px;
  margin-top: 16px;
  border-radius: 12px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.referral-program__picture {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  aspect-ratio: 1 / 1;
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 12px;
}

.referral-program__title {
  grid-column: 2 / 4;
  grid-row: 1 / 2;
  margin-top: 8px;
  font: 900 16px / 16px TTDrugs;
  color: var(--color-gray-gray-1);
}

.referral-program__countdown {
  align-self: end;
  margin-bottom: 12px;
  font: 700 12px / 12px TTDrugs;
  color: var(--color-gray-gray-3);
}

.referral-program__countdown_warning {
  color: var(--color-gray-gray-3);
}

.referral-program__countdown_danger {
  color: var(--color-accent-rust);
}

.referral-program__action {
  margin: 0 4px 4px 0;
}

.invite-user {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, max-content) 1fr;
  column-gap: 16px;
  margin-top: 16px;
  padding: 8px;
  border-radius: 16px;
  color: var(--color-gray-white);
  background-color: var(--color-accent-rust);
}

.invite-user__title {
  margin: 8px 0 0 8px;
  font: 900 20px / 20px TTDrugs;
}

.invite-user__invited-count {
  margin: 8px 0 0 8px;
  font: 700 12px / 12px TTDrugs;
}

.invite-user__qr {
  grid-column: 2 / 3;
  grid-row: 1 / 4;
  aspect-ratio: 1 / 1;
  background-position: 50% 50%;
  background-size: contain;
}

.invite-user__copy-link {
  align-self: end;
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
