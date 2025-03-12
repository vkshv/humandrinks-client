<template>
  <InitLoader v-if="appStore.init" />
  <template v-else>
    <div class="view">
      <RouterView />
    </div>
    <TheNotifications />
    <Loader />
    <TopSpacer />
  </template>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { STATUS_CODE, STATUS_TEXT } from '@/const/http'
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
    window.Telegram.WebApp.requestFullscreen()
    authStore.setInitData()
  } catch (error) {
    // что-то пошло не так с telegram-web-app
  }
  try {
    const response = await authStore.authenticateUser(window.Telegram.WebApp.initData)
    const { token, ...userRegData } = response.data
    authStore.ACCESS_TOKEN = token
    authStore.userRegData = userRegData
    router.push('/feed')
  } catch (error) {
    if (error.response?.status === STATUS_CODE.UNAUTHORIZED) {
      router.push('/enter-phone')
    }
  }
  appStore.init = false
})
</script>

<style scoped>
.view {
  margin-top: calc(var(--tg-safe-area-inset-top) + var(--tg-content-safe-area-inset-top));
}
</style>
