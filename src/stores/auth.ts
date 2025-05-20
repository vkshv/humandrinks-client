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
  const utm_source = ref<string | undefined>()
  const referral_code = ref<string | undefined>()

  function authenticateUser(initData: any) {
    return http.post('auth/authenticate-user', { initData, utm_source: utm_source.value })
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
    const response = await http.post('auth/register', {
      ...data,
      utm_source: utm_source.value,
      referral_code: referral_code.value
    })
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

  async function syncVisitor() {
    const response = await http.post('auth/sync-visitor', userRegData.value)
    if (response.data.bonus || response.data.cardNumber) {
      userRegData.value.bonus = response.data.bonus
      userRegData.value.cardNumber = response.data.cardNumber
    }
    return response
  }

  return {
    initData,
    phone,
    userRegData,
    ACCESS_TOKEN,
    utm_source,
    referral_code,
    authenticateUser,
    getUser,
    setInitData,
    sendCode,
    validateCode,
    register,
    checkRegPromocode,
    redeemPromocode,
    suggestAddress,
    syncVisitor
  }
})
