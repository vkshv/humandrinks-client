<template>
  <div class="">
    <RouterView />
  </div>
  <FoodModal />
  <DrinkModal />
  <EventModal />
  <MerchModal />
  <BonusModal />
  <BonusHowItWorksModal />
  <WhatsnewModal />
  <ReferralBonusModal />
  <!-- <FeedbackModal /> -->
  <!-- <EventHowItWorksModal /> -->
  <ScanQrFab v-if="authStore.userRegData.isAdmin" />
  <FeedbackFab v-else />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import FoodModal from '@/components/FoodModal.vue'
import DrinkModal from '@/components/DrinkModal.vue'
import EventModal from '@/components/EventModal.vue'
import MerchModal from '@/components/MerchModal.vue'
import BonusHowItWorksModal from '@/components/BonusHowItWorksModal.vue'
// import EventHowItWorksModal from '@/components/EventHowItWorksModal.vue'
import BonusModal from '@/components/BonusModal.vue'
import WhatsnewModal from '@/components/WhatsnewModal.vue'
import ReferralBonusModal from '@/components/ReferralBonusModal.vue'
// import FeedbackModal from '@/components/FeedbackModal.vue'
import FeedbackFab from '@/components/FeedbackFab.vue'
import ScanQrFab from '@/components/ScanQrFab.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  try {
    await authStore.syncVisitor()
  } catch (error) {}
})
</script>
