import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import http from '@/services/http'

export const useAgentStore = defineStore('agent', () => {
  function activateReferralProgram(referralTelegramId: string) {
    return http.post('agent/activate-referral-program', { referralTelegramId })
  }

  return {
    activateReferralProgram
  }
})
