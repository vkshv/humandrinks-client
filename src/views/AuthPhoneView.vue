<template>
  <div class="auth-phone-view">
    <div class="top-spacer-footer"></div>
    <div class="logo">
      <img src="../assets/logo.svg" alt="">
    </div>
    <div class="phone">
      <ui-text-field
        :value="phone"
        v-mask="'+7 (###) ### ## ##'"
        placeholder="+7 (---) --- -- --"
        class-name="text-field--primary"
        inputmode="numeric"
        :disabled="sendCodeLoader"
        :error="phoneError"
        @input="handlePhoneInput"
      />
    </div>
    <div class="info">Никакого спама: уведомления можно будет отключить в настройках</div>
    <div class="send">
      <ui-button
        v-show="phone"
        class-name="button--primary"
        :loading="sendCodeLoader"
        @click="sendCode"
      >
        Получить код
      </ui-button>
    </div>
    <div class="restore">
      <ui-button
        class-name="button--text"
        @click="restoreAccess"
      >
        Восстановить доступ
      </ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'
import { STATUS_CODE } from '@/const/http'
import router from '@/router'

const appStore = useAppStore()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const phone = ref('')
const phoneError = ref('')
const sendCodeLoader = ref(false)

function validatePhone() {
  if (!/^\+7 \(\d\d\d\) \d\d\d \d\d \d\d$/.test(phone.value)) {
    phoneError.value = 'Введите корректный номер телефона'
  } else {
    phoneError.value = ''
  }
}

function handlePhoneInput(event: InputEvent) {
  phoneError.value = ''
  const input = event.target as HTMLInputElement
  phone.value = input.value
}

async function sendCode() {
  validatePhone()
  if (phoneError.value) return

  // appStore.loader = true
  sendCodeLoader.value = true
  try {
    await authStore.sendCode(phone.value)
    router.push('/enter-code')
  } catch (error: any) {
    if (error.response?.status === STATUS_CODE.TOO_MANY_REQUESTS) {
      phoneError.value = 'Попробуйте снова через минуту'
    // } else if (error.response?.status === STATUS_CODE.FORBIDDEN) {
    //   phoneError.value = 'Ваш оператор не поддерживается'
    } else {
      phoneError.value = 'Что-то пошло не так, повторите попытку позже'
    }
  }
  // appStore.loader = false
  sendCodeLoader.value = false
}

function restoreAccess() {
  
}
</script>

<style scoped>
.auth-phone-view {
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

.logo {
  margin-top: 48px;
  justify-self: center;
}

.phone {
  margin-top: 48px;
  padding: 0 16px;
}

.info {
  justify-self: center;
  max-width: 240px;
  margin-top: 24px;
  font: var(--font-caption-c1);
  color: var(--color-gray-gray-4);
  text-align: center;
}

.send {
  margin-top: 24px;
  padding: 0 16px;
}

.restore {
  align-self: end;
  justify-self: center;
  margin-bottom: var(--bottom-spacer-height);
}
</style>
