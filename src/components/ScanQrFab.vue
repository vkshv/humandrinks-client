<template>
  <div
    class="scan-qr-fab"
    @click="clickHandler"
  >
    <div class="scan-qr-fab__outer">
      <div class="scan-qr-fab__inner">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>qrcode-scan</title><path d="M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z" fill="#ffffff" /></svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import config from '@/config'
import { useAppStore } from '@/stores/app'
import { useAgentStore } from '@/stores/agent'
import { QrActionType } from '@/const/common'

const appStore = useAppStore()
const agentStore = useAgentStore()

function clickHandler() {
  window.Telegram.WebApp.showScanQrPopup({}, async (text: string) => {
    window.Telegram.WebApp.closeScanQrPopup()
    let qr_data = null
    try {
      qr_data = JSON.parse(text)
      if (!Object.values(QrActionType).includes(qr_data.ACTN)) throw new Error()
    } catch (error) {
      window.Telegram.WebApp.showPopup({ message: 'ОШИБКА. Некорректный QR-код' })
      return
    }

    // Активация реферального кода
    if (qr_data.ACTN === QrActionType.ACTIVATE_REFERRAL_PROGRAM) {
      if (!+qr_data.DT) {
        window.Telegram.WebApp.showPopup({ message: 'ОШИБКА. Некорректный QR-код' })
      }
      appStore.loader = true
      try {
        await agentStore.activateReferralProgram(qr_data.DT)
        window.Telegram.WebApp.showPopup({ message: 'Реферальная программа активирована' })
      } catch (error: any) {
        window.Telegram.WebApp.showPopup({ message: 'ОШИБКА. ' + error.response.data.message })
      }
      appStore.loader = false
    }
  })
}
</script>

<style scoped>
.scan-qr-fab {
  position: fixed;
  bottom: calc(var(--bottom-spacer-height) - 2px);
  right: 24px;
}

.scan-qr-fab__outer {
  width: 36px;
  height: 36px;
  padding: 2px;
  box-sizing: border-box;
  border-radius: 36px;
  background-color: var(--color-accent-rust);
}

.scan-qr-fab__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-gray-white);
  box-sizing: border-box;
  border-radius: 32px;
}

.scan-qr-fab__inner > svg {
  width: 20px;
}
</style>
