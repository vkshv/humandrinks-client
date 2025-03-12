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
  <FoodModal />
  <DrinkModal />
  <EventModal />
  <MerchModal />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import FoodModal from '@/components/FoodModal.vue'
import DrinkModal from '@/components/DrinkModal.vue'
import EventModal from '@/components/EventModal.vue'
import MerchModal from '@/components/MerchModal.vue'

const authStore = useAuthStore()
</script>
