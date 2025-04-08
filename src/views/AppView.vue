<template>
  <div class="">
    <RouterView />
  </div>
  <FoodModal />
  <DrinkModal />
  <EventModal />
  <MerchModal />
  <BonusModal />
  <MerchHowItWorksModal />
  <!-- <EventHowItWorksModal /> -->
</template>

<script setup lang="ts">
import FoodModal from '@/components/FoodModal.vue'
import DrinkModal from '@/components/DrinkModal.vue'
import EventModal from '@/components/EventModal.vue'
import MerchModal from '@/components/MerchModal.vue'
import MerchHowItWorksModal from '@/components/MerchHowItWorksModal.vue'
// import EventHowItWorksModal from '@/components/EventHowItWorksModal.vue'
import BonusModal from '@/components/BonusModal.vue'
</script>
