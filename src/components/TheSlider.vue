<template>
  <div class="the-slider">
    <swiper
      :modules="[Autoplay, Pagination]"
      :slides-per-view="1"
      :space-between="50"
      :autoplay="{ delay: 5000 }"
      :pagination="{ clickable: true }"
    >
      <swiper-slide
        v-for="name in slotNames"
        :key="name"
      >
        <slot :name="name" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'

defineProps<{
  slotNames: string[]
}>()
</script>

<style>
.the-slider .swiper {
  border-radius: 16px;
}

.the-slider .swiper-pagination-bullet {
  width: 24px;
  height: 5px;
  border-radius: 5px;
  background: rgba(255, 255, 255);
}

.the-slider .swiper-pagination-bullet-active {
  animation: theSliderGradient 5000ms linear;
  background: linear-gradient(to right, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0.2) 50%);
  background-size: 200% 100%;
}

@keyframes theSliderGradient {
  0% { background-position: 100% 0%; }
  100% { background-position: 0% 0%; }
}
</style>
