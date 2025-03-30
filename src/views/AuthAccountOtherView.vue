<template>
  <div class="auth-account-other-view">
    <div class="top-spacer-footer"></div>
    <div class="title">почти готово</div>
    <div class="field">
      <ui-text-field
        v-mask="'##.##.####'"
        class-name="text-field--primary-extended"
        label="Днюха"
        placeholder="Выбрать дату"
        v-model="authStore.userRegData.birth"
        :error="birthError"
        @input="birthError = ''"
        @blur="validate_birth"
      />
    </div>
    <div class="field">
      <AddressSuggestionField
        label="Адрес"
        @change="addressChanged"
        @click-outside="addressClickedOutside"
      />
    </div>
    <div class="field">
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
    <div class="register">
      <ui-button
        class-name="button--primary"
        @click="register"
      >
        готово
      </ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'
import { STATUS_CODE } from '@/const/http'
import type { AddressSuggestion } from '@/types/auth'
import router from '@/router'
import PromocodeField from '@/components/PromocodeField.vue'
import AddressSuggestionField from '@/components/AddressSuggestionField.vue'

const appStore = useAppStore()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const birthError = ref('')
const addressError = ref('')
const promocode = ref('')
const promocode_error = ref('')
const promocode_success = ref('')
const promocode_processing = ref(false)

const hasError = computed(() => {
  return !authStore.userRegData.birth
    || !authStore.userRegData.address
    || birthError.value
    || addressError.value
})

function parse_date(dateString: string) {
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(dateString)) return

  const [day, month, year] = dateString.split('.').map(Number)
  const date = new Date(year, month - 1, day)
  if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) return date
}

function isEighteen(birth: string) {
  const birthday = parse_date(birth) ?? new Date()
  const eighteenYearsAgo = new Date()
  eighteenYearsAgo.setFullYear(new Date().getFullYear() - 18)
  return birthday < eighteenYearsAgo
}

function validate_birth() {
  birthError.value = ''
  if (!authStore.userRegData.birth) birthError.value = 'Не заполнено'
  else if (!parse_date(authStore.userRegData.birth)) birthError.value = 'Некорректная дата'
  else if (!isEighteen(authStore.userRegData.birth as string)) birthError.value = 'Регистрация доступна только совершеннолетним'
}

function inputPromocodeHandler() {
  promocode_error.value = ''
  promocode_success.value = ''
}

async function applyPromocodeHandler() {
  promocode_processing.value = true
  appStore.loader = true
  try {
    const response = await authStore.checkRegPromocode(promocode.value)
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

async function register() {
  if (hasError.value) return
  appStore.loader = true
  try {
    await authStore.register({
      name: authStore.userRegData.name,
      surname: authStore.userRegData.surname,
      patronymic: authStore.userRegData.patronymic,
      address: authStore.userRegData.address,
      phone: authStore.phone,
      birth: authStore.userRegData.birth,
      promocode: promocode.value
    })
  } catch (error: any) {
    if (error.response?.status === STATUS_CODE.UNAUTHORIZED) {
      notificationsStore.error('Время жизни кода истекло. Пройдите регистрацию заново')
      router.push('/enter-phone')
    } else {
      notificationsStore.error('Что-то пошло не так. Повторите попытку позже')
    }
  }
  try {
    const response = await authStore.authenticateUser(window.Telegram.WebApp.initData)
    const { token, ...userRegData } = response.data
    authStore.ACCESS_TOKEN = token
    authStore.userRegData = userRegData
    router.push('/feed')
  } catch (error) {
    notificationsStore.error('Что-то пошло не так. Повторите попытку позже')
  }
  appStore.loader = false
}

function addressChanged(addressSuggestion: AddressSuggestion) {
  if (addressSuggestion.level < 8) {
    addressError.value = 'Укажите полный адрес'
  } else {
    addressError.value = ''
    authStore.userRegData.address = addressSuggestion.value
  }
}

function addressClickedOutside() {}
</script>

<style scoped>
.auth-account-other-view {
  min-height: var(--safe-viewport-height);
  display: grid;
  grid-template-rows: repeat(5, max-content) 1fr;
}

.top-spacer-footer {
  position: sticky;
  top: var(--top-spacer-height);
  height: 12px;
  border-radius: 0 0 12px 12px;
  background-color: var(--color-accent-rust);
}

.title {
  margin: 24px 0 16px 0;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
  text-align: center;
}

.field {
  margin-top: 8px;
  padding: 0 8px;
}

.register {
  align-self: end;
  padding: 0 8px;
  margin-bottom: var(--bottom-spacer-height);
}
</style>
