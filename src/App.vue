<template>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

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
  try {
    await loadTelegramWebAppScript()
    window.Telegram.WebApp.init()
    authStore.setInitData()
  } catch (error) {
    // что-то пошло не так с telegram-web-app
  }
  try {
    const response = await authStore.authenticateUser(window.Telegram.WebApp.initData)
  } catch (error) {
    
  }
})
</script>

<style scoped>
</style>
