<template>
  <div class="page">
    <div class="">
      <img src="../assets/logo.svg" alt="">
    </div>
    <div class="">
      <ui-text-field
        v-mask="'+7 (###) ### ## ##'"
        placeholder="+7 (---) --- -- --"
        :error="phoneError"
        @input="handlePhoneInput"
      />
    </div>
    <div class="">Никакого спама: уведомления можно будет отключить в настройках</div>
    <div class="">
      <ui-button
        @click="sendCode"
      >
        Получить код
      </ui-button>
    </div>
    <div class="">
      <ui-button>
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

function validatePhone() {
  if (!/^\+7 \(\d\d\d\) \d\d\d \d\d \d\d$/.test(phone.value)) {
    phoneError.value = 'Некорректный номер телефона'
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

  appStore.loader = true
  try {
    await authStore.sendCode(phone.value)
    router.push('/enter-code')
  } catch (error: any) {
    if (error.response?.status === STATUS_CODE.BAD_REQUEST) {
      phoneError.value = error.response.data?.message ?? ''
    } else {
      notificationsStore.error('Что-то пошло не так. Повторите попытку позже')
    }
  }
  appStore.loader = false
}
</script>

<style>
.page {
  min-height: 100vh;
  background-color: #FFF;
}
</style>
