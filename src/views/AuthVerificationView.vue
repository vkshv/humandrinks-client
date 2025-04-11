<template>
  <div class="auth-verification-view">
    <div class="top-spacer-footer"></div>
    <div class="title">Введите код</div>
    <!-- <div class="info">На номер {{ authStore.phone }} придёт смс-код</div> -->
    <div class="info">Скоро вам позвонит робот.<br/> Введите последние 4 цифры номера,<br/> с которого будет звонок</div>
    <div class="otp-field">
      <ui-otp-field
        :modelValue="code"
        class-name="otp-field--primary"
        :error="codeError"
        @update:modelValue="handleCodeUpdate"
      />
    </div>
    <div class="resend">
      <div
        v-if="time"
        class="resend__timer"
      >
        Отправить код ещё раз ({{ time }} сек)
      </div>
      <div
        v-else
        class="resend__action"
        @click="resendCode"
      >
        Отправить код ещё раз
      </div>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'
import { STATUS_CODE } from '@/const/http'
import router from '@/router'

const appStore = useAppStore()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const code = ref('')
const codeError = ref('')

let timer: number | null | undefined = null
const time = ref(60)

onMounted(() => {
  startTimer()
  try {
    window.Telegram.WebApp.BackButton.show()
  } catch (error) {}
})

onUnmounted(() => {
  try {
    window.Telegram.WebApp.BackButton.hide()
  } catch (error) {}
})

async function handleCodeUpdate(value: string) {
  if (code.value === value) return

  code.value = value
  codeError.value = ''
  if (code.value.length !== 4) return

  appStore.loader = true
  try {
    const response = await authStore.validateCode(code.value, window.Telegram.WebApp.initData)
    const { token, ...userRegData } = response.data
    authStore.ACCESS_TOKEN = token
    authStore.userRegData = userRegData
    router.push('/create-account-name')
  } catch (error: any) {
    code.value = ''
    if (error.response?.status === STATUS_CODE.UNAUTHORIZED) {
      codeError.value = error.response.data?.message ?? ''
    } else {
      notificationsStore.error('Что-то пошло не так. Повторите попытку позже')
    }
  }
  appStore.loader = false
}

async function resendCode() {
  appStore.loader = true
  try {
    await authStore.sendCode(authStore.phone)
    startTimer()
  } catch (error) {
    notificationsStore.error('Что-то пошло не так. Повторите попытку позже')
  }
  appStore.loader = false  
}

function restoreAccess() {
  
}

function startTimer() {
  time.value = 60
  timer = setInterval(() => {
    time.value--
    if (time.value === 0) {
      timer && clearInterval(timer)
    }
  }, 1000)
}
</script>

<style scoped>
.auth-verification-view {
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
  margin-top: 32px;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
  text-align: center;
}

.info {
  justify-self: center;
  /* max-width: 240px; */
  margin-top: 8px;
  font: var(--font-body-b2);
  color: var(--color-gray-gray-4);
  text-align: center;
}

.otp-field {
  justify-self: center;
  margin-top: 24px;
}

.resend {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.resend__timer {
  font: var(--font-body-b3);
  color: var(--color-gray-gray-4);
}

.resend__action {
  font: var(--font-body-b3-bold);
  color: var(--color-accent-rust);
}

.restore {
  align-self: end;
  justify-self: center;
  margin-bottom: var(--bottom-spacer-height);
}
</style>
