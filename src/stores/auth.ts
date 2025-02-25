import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { TelegramWebAppInitData } from '@/types/telegram'
import type { IUserRegData } from '@/types/auth'
import http from '@/services/http'

export const useAuthStore = defineStore('auth', () => {
  const initData = ref<TelegramWebAppInitData | null>(null)
  const phone = ref<string>('')
  const userRegData = ref<IUserRegData>({})
  const ACCESS_TOKEN = ref<string>('')

  function authenticateUser(initData: any) {
    return http.post('auth/authenticate-user', { initData })
  }

  function setInitData() {
    initData.value = window.Telegram.WebApp.initDataUnsafe
  }

  async function sendCode(_phone: string) {
    phone.value = _phone
    const response = await http.post('auth/send-code', { phone: _phone })
    return response
  }

  async function validateCode(code: string, initData: string) {
    const response = await http.post('auth/validate-code', {
      phone: phone.value,
      code,
      initData
    })
    return response
  }

  async function register(data: any) {
    const response = await http.post('auth/register', data)
    return response
  }

  return {
    initData,
    phone,
    userRegData,
    ACCESS_TOKEN,
    authenticateUser,
    setInitData,
    sendCode,
    validateCode,
    register
  }
})
