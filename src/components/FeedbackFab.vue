<template>
  <div
    class="feedback-fab"
    @click="clickHandler"
  >
    <div class="feedback-fab__outer">
      <div class="feedback-fab__inner">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>help</title><path d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" fill="#ffffff" /></svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import config from '@/config'

function clickHandler() {
  try {
    window.Telegram.WebApp.showConfirm('Мы откроем telegram-чат с поддержкой, а приложение закроется. Продолжить?', (answer: boolean) => {
      if (answer) {
        window.open(config.FEEDBACK_TG_LINK, '_blank')
        window.Telegram.WebApp.close()
      }
    })
  } catch (error) {
    // 
  }
}
</script>

<style scoped>
.feedback-fab {
  position: fixed;
  bottom: calc(var(--bottom-spacer-height) - 2px);
  right: 24px;
}

.feedback-fab__outer {
  width: 36px;
  height: 36px;
  padding: 2px;
  box-sizing: border-box;
  border-radius: 36px;
  background-color: var(--color-accent-rust);
}

.feedback-fab__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-gray-white);
  box-sizing: border-box;
  border-radius: 32px;
}

.feedback-fab__inner > svg {
  width: 20px;
}
</style>
