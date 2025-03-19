<template>
  <div class="auth-account-other-view">
    <div class="top-spacer-footer"></div>
    <div class="title">как вас зовут?</div>
    <div class="field">
      <ui-text-field
        v-mask="'##.##.####'"
        class-name="text-field--primary-extended"
        label="Днюха"
        placeholder="Выбрать дату"
        v-model="authStore.userRegData.birth"
        :error="birthError"
        @input="birthError = ''"
      />
    </div>
    <div class="field">
      <ui-text-field
        v-model="authStore.userRegData.address"
        class-name="text-field--primary-extended"
        placeholder="..."
        label="Адрес"
        :error="addressError"
        @input="addressError = ''"
      />
    </div>
    <div class="field">
      <!-- <ui-text-field
        :value="authStore.phone"
        disabled
      /> -->
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
import router from '@/router'

const appStore = useAppStore()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const surnameError = ref('')
const nameError = ref('')
const patronymicError = ref('')
const birthError = ref('')
const addressError = ref('')

const hasError = computed(() => {
  return surnameError.value || nameError.value || patronymicError.value || birthError.value || addressError.value
})

function validate() {
  if (!authStore.userRegData.surname) surnameError.value = 'Не заполнено'
  if (!authStore.userRegData.name) nameError.value = 'Не заполнено'
  if (!authStore.userRegData.patronymic) patronymicError.value = 'Не заполнено'
  if (!authStore.userRegData.birth) birthError.value = 'Не заполнено'
  if (!authStore.userRegData.address) addressError.value = 'Не заполнено'
}

async function register() {
  validate()
  if (hasError.value) return
  appStore.loader = true
  try {
    await authStore.register({
      name: authStore.userRegData.name,
      surname: authStore.userRegData.surname,
      patronymic: authStore.userRegData.patronymic,
      address: authStore.userRegData.address,
      phone: authStore.phone,
      birth: authStore.userRegData.birth
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
</script>

<style scoped>
.auth-account-other-view {
  min-height: var(--safe-viewport-height);
  display: grid;
  grid-template-rows: repeat(5, max-content) 1fr;
}

.top-spacer-footer {
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
