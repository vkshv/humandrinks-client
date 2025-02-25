<template>
  <div class="notifications">
    <template v-for="item in store.notifications">
      <div :class="'notification notification-' + item.type">
        {{ item.message }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useNotificationsStore } from '@/stores/notifications'

const store = useNotificationsStore()
</script>

<style scoped>
.notifications {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}

.notification {}
</style>
