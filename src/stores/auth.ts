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

  async function getUser(initData: any) {
    const response = await http.post('auth/get-user', { initData })
    userRegData.value = response.data
    return response
  }

  function setInitData() {
    initData.value = window.Telegram.WebApp.initDataUnsafe
  }

  async function sendCode(_phone: string) {
    phone.value = _phone
    const response = await http.post('auth/call-password', { phone: _phone })
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

  async function checkRegPromocode(promocode: string) {
    const response = await http.get('auth/check-reg-promocode', { params: { promocode } })
    return response
  }

  async function redeemPromocode(promocode: string) {
    const response = await http.post('auth/redeem-promocode', { promocode })
    return response
  }

  async function suggestAddress(query: string) {
    const response = await http.post('auth/suggest-address', { query })
    return response
  }

  return {
    initData,
    phone,
    userRegData,
    ACCESS_TOKEN,
    authenticateUser,
    getUser,
    setInitData,
    sendCode,
    validateCode,
    register,
    checkRegPromocode,
    redeemPromocode,
    suggestAddress
  }
})
