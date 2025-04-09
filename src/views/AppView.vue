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
  <!-- <EventHowItWorksModal /> -->
</template>

<script setup lang="ts">
import FoodModal from '@/components/FoodModal.vue'
import DrinkModal from '@/components/DrinkModal.vue'
import EventModal from '@/components/EventModal.vue'
import MerchModal from '@/components/MerchModal.vue'
import BonusHowItWorksModal from '@/components/BonusHowItWorksModal.vue'
// import EventHowItWorksModal from '@/components/EventHowItWorksModal.vue'
import BonusModal from '@/components/BonusModal.vue'
import WhatsnewModal from '@/components/WhatsnewModal.vue'
</script>
