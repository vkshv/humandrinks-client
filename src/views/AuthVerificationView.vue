<template>
  <div class="">Введите код</div>
  <div class="">На номер {{ authStore.phone }} придёт СМС-код</div>
  <div class="">
    <ui-otp-field
      :modelValue="code"
      :error="codeError"
      @update:modelValue="handleCodeUpdate"
    />
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

const code = ref('')
const codeError = ref('')

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
    router.push('/create-account')
  } catch (error: any) {
    if (error.response?.status === STATUS_CODE.UNAUTHORIZED) {
      codeError.value = error.response.data?.message ?? ''
      code.value = ''
    } else {
      notificationsStore.error('Что-то пошло не так. Повторите попытку позже')
    }
  }
  appStore.loader = false
}
</script>

<style>
</style>
