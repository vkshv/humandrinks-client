<template>
  <InitLoader v-if="appStore.init" />
  <template v-else>
    <div class="app-view">
      <RouterView />
    </div>
    <TheNotifications />
    <TopSpacer />
    <Loader v-if="appStore.loader" />
  </template>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { STATUS_CODE, STATUS_TEXT } from '@/const/http'
import { parseQueryString } from '@/helpers'
import TheNotifications from '@/components/TheNotifications.vue'
import InitLoader from '@/components/InitLoader.vue'
import Loader from '@/components/TheLoader.vue'
import TopSpacer from '@/components/TopSpacer.vue'

const appStore = useAppStore()
const authStore = useAuthStore()

function loadTelegramWebAppScript() {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.setAttribute('src', 'https://telegram.org/js/telegram-web-app.js?56')
    script.onload = () => resolve()
    script.onerror = () => reject()
    document.head.append(script)
  })
}

onMounted(async () => {
  appStore.init = true
  try {
    await loadTelegramWebAppScript()
    if (['android', 'ios'].includes(window.Telegram.WebApp.platform)) {
      window.Telegram.WebApp.requestFullscreen()
    }
    window.Telegram.WebApp.onEvent('backButtonClicked', function() {
      window.history.back()
    })
    authStore.setInitData()
  } catch (error) {
    // что-то пошло не так с telegram-web-app
  }
  try {
    const start_param = parseQueryString(window.Telegram.WebApp.initDataUnsafe.start_param)
    if (start_param.utm_source) authStore.utm_source = start_param.utm_source
    if (start_param.referral_code) authStore.reg_referral_code = start_param.referral_code
  } catch (error) {
    // 
  }
  try {
    const response = await authStore.authenticateUser(window.Telegram.WebApp.initData)
    const { token, ...userRegData } = response.data
    authStore.ACCESS_TOKEN = token
    authStore.userRegData = userRegData
    if (authStore.userRegData.referralProgram && !authStore.userRegData.referralProgram.activated) {
      authStore.loadReferralProgram(authStore.userRegData.referralProgram.programSlug as string) // not await call
    }
    router.push('/feed')
  } catch (error: any) {
    if (error.response?.status === STATUS_CODE.UNAUTHORIZED) {
      router.push('/enter-phone')
    }
  }
  appStore.init = false

  // Telegram WebView перехватывает события касания (touchstart, touchend), из-за чего blur() не вызывается при клике вне инпута
  document.addEventListener('touchstart', function(event) {
    if (event.target instanceof Element && !event.target.closest('input, textarea')) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }
  })
})
</script>

<style scoped>
.app-view {
  margin-top: var(--top-spacer-height);
}
</style>
