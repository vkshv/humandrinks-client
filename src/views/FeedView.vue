<template>
  <div class="">
    <div class="">
      <Slider :slot-names="sliderItems.map((e) => e.documentId)">
        <template
          v-for="item in sliderItems"
          :key="item.documentId"
          v-slot:[item.documentId]
        >
          <div
            class=""
            @click="itemModalStore.openEvent(item)"
          >
            <div class="event-slider__img">
              <img
                :src="config.STRAPI_URL + item.picture"
                class=""
              >
            </div>
          </div>
        </template>
      </Slider>
    </div>
    <div class="">
      <button @click="router.push('/menu?category=food')">Еда</button>
      <button @click="router.push('/menu?category=bar')">Бар</button>
      <button @click="router.push('/reserve')">Забронировать столик</button>
    </div>
    <div class="">
      <div class="">Ивенты</div>
      <div class="" @click="router.push('/events')">Все</div>
      <div class="events__list">
        <div
          v-for="item in contentStore.eventItems"
          :key="item.documentId"
          class="events__item"
        >
          <div class="events__item-img">
            <img :src="config.STRAPI_URL + item.picture">
          </div>
          <div class="">
            {{ item.title }}
          </div>
          <div class="">
            {{ item.date }} {{ item.time }}
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="">Мерч</div>
      <div class="" @click="router.push('/merch')">Все</div>
      <div class="merch__list">
        <div
          v-for="item in contentStore.merchItems"
          :key="item.documentId"
          class="merch__item"
        >
          <div class="merch__item-img">
            <img :src="config.STRAPI_URL + item.picture">
          </div>
          <div class="">
            {{ item.title }}
          </div>
          <div class="">
            {{ item.price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useContentStore } from '@/stores/content'
import { useItemModalStore } from '@/stores/itemModal'
import Slider from '@/components/TheSlider.vue'
import config from '@/config'
import router from '@/router'

const appStore = useAppStore()
const contentStore = useContentStore()
const itemModalStore = useItemModalStore()

const sliderItems = computed(() => {
  return contentStore.eventItems
})

onMounted(async () => {
  appStore.loader = true
  try {
    await Promise.all([
      contentStore.loadEventItems(),
      contentStore.loadEventCategories(),
      contentStore.loadMerchItems()
    ])
  } catch (error) {
    
  }
  appStore.loader = false
})
</script>

<style scoped>
.event-slider__img > img {
  width: 100vw;
}

.events__list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.events__item {
  width: 128px;
}

.events__item-img > img {
  width: 100%;
}

.merch__list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.merch__item {
  width: 220px;
}

.merch__item-img > img {
  width: 100%;
}
</style>
