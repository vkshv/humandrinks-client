<template>
  <div class="">
    <div class="">
      <div class=""></div>
      <div class="">{{ authStore.userRegData.bonus }}</div>
    </div>
    <div class="">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
