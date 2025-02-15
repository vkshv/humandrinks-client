import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { TelegramWebAppInitData } from '@/types/telegram'
import http from '@/services/http'

export const useAuthStore = defineStore('auth', () => {
  const initData = ref<TelegramWebAppInitData | null>(null)

  function authenticateUser(initData: any) {
    return http.post('auth/authenticate-user', { initData })
  }

  function setInitData() {
    initData.value = window.Telegram.WebApp.initDataUnsafe
  }

  return {
    initData,
    authenticateUser,
    setInitData
  }
})
