<template>
  <div class="merch-view">
    <div class="hero" ref="hero_ref">
      <div class="title">мерч</div>
      <div class="actions">
        <ui-button
          class-name="button--hero button--hero-tall"
          @click="showBonus"
        >
          <span>бонусы</span>
          <template #extra>
            <div class="actions__bonus-extra">
              <div class="">{{ authStore.userRegData.bonus }}</div>
              <div class="">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9612 1.19614C11.071 1.25727 11.1572 1.3534 11.206 1.46922C11.2548 1.58504 11.2634 1.71386 11.2305 1.83514L9.73647 7.31239H15.1875C15.2971 7.3124 15.4043 7.34444 15.496 7.40457C15.5876 7.4647 15.6597 7.5503 15.7034 7.65085C15.747 7.7514 15.7604 7.86252 15.7417 7.97054C15.7231 8.07857 15.6733 8.17879 15.5985 8.25889L7.72346 16.6964C7.63769 16.7885 7.52351 16.8492 7.39918 16.8687C7.27486 16.8883 7.14757 16.8655 7.03768 16.8042C6.92778 16.7429 6.84164 16.6464 6.79301 16.5304C6.74439 16.4143 6.7361 16.2852 6.76946 16.1639L8.26346 10.6874H2.81246C2.70284 10.6874 2.59561 10.6553 2.50396 10.5952C2.4123 10.5351 2.34021 10.4495 2.29654 10.3489C2.25288 10.2484 2.23955 10.1373 2.25819 10.0292C2.27683 9.92122 2.32663 9.821 2.40146 9.74089L10.2765 1.30339C10.3622 1.21163 10.4763 1.15121 10.6004 1.13178C10.7245 1.11234 10.8515 1.135 10.9612 1.19614Z" fill="white"/>
                </svg>
              </div>
            </div>
          </template>
        </ui-button>
        <ui-button
          class-name="button--hero button--hero-tall"
          @click="showHowItWorks"
        >
          <span>как это работает?</span>
        </ui-button>
      </div>
    </div>
    <div class="top-spacer-footer"></div>
    <div class="items">
      <div
        v-for="item in contentStore.merchItems"
        class="item"
        @click="itemModalStore.openMerch(item)"
      >
        <div
          class="item__img"
          :style="{ backgroundImage: `url(${config.STRAPI_URL + item.picture})` }"
        >
          <div class="item__tags">
            <div v-if="item.count < 4" class="item__tag">{{ item.count }} осталось</div>
          </div>
        </div>
        <div class="item__price">
          {{ item.bonusPrice }}
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.69852 0.730977C6.76563 0.768329 6.8183 0.82708 6.84812 0.897858C6.87794 0.968635 6.8832 1.04736 6.86306 1.12148L5.95006 4.46868H9.28123C9.34822 4.46869 9.41375 4.48827 9.46976 4.52501C9.52577 4.56176 9.56983 4.61407 9.59651 4.67552C9.62319 4.73697 9.63134 4.80487 9.61995 4.87089C9.60856 4.9369 9.57813 4.99815 9.5324 5.0471L4.7199 10.2034C4.66748 10.2596 4.5977 10.2967 4.52172 10.3087C4.44575 10.3206 4.36796 10.3067 4.3008 10.2692C4.23365 10.2317 4.181 10.1728 4.15128 10.1019C4.12157 10.0309 4.1165 9.95209 4.1369 9.87793L5.0499 6.53118H1.71873C1.65174 6.53118 1.58621 6.5116 1.5302 6.47486C1.47418 6.43811 1.43013 6.3858 1.40344 6.32435C1.37676 6.2629 1.36862 6.195 1.38001 6.12898C1.3914 6.06297 1.42183 6.00172 1.46756 5.95277L6.28006 0.796518C6.33248 0.740439 6.40216 0.703519 6.478 0.691641C6.55383 0.679763 6.63147 0.69361 6.69852 0.730977Z" fill="#D45135"/>
          </svg>
        </div>
        <div class="item__title">{{ item.title }}</div>
      </div>
    </div>
  </div>
  <BonusHanging
    :show="isHeroOverViewport"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useContentStore } from '@/stores/content'
import { useItemModalStore } from '@/stores/itemModal'
import { useAuthStore } from '@/stores/auth'
import config from '@/config'
import BonusHanging from '@/components/BonusHanging.vue'

const contentStore = useContentStore()
const itemModalStore = useItemModalStore()
const authStore = useAuthStore()

const hero_ref = ref<HTMLElement | null>(null)
const isHeroOverViewport = ref(false)

onMounted(async () => {
  checkContentVisibility()
  window.addEventListener('scroll', checkContentVisibility)
  window.addEventListener('resize', checkContentVisibility)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkContentVisibility)
  window.removeEventListener('resize', checkContentVisibility)
})

function showBonus() {
  itemModalStore.openBonus()
}

function showHowItWorks() {
  itemModalStore.openBonusHowItWorks()
}

function checkContentVisibility() {
  const rectHero = hero_ref.value?.getBoundingClientRect()
  isHeroOverViewport.value = (rectHero?.bottom ?? 0) < 0
}
</script>

<style scoped>
.merch-view {
  padding-bottom: var(--bottom-spacer-height);
}

.hero {
  position: relative;
  z-index: 5;
  padding: 0 8px;
  background-color: var(--color-accent-rust);
}

.title {
  margin-top: 8px;
  font: var(--font-header-h1);
  color: var(--color-gray-white);
}

.actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4px;
  margin-top: 12px;
  transform: translateY(4px);
}

.actions__bonus-extra {
  display: flex;
  column-gap: 4px;
  font: 400 18px/18px Biform;
  letter-spacing: -1.5px;
}

.top-spacer-footer {
  position: sticky;
  top: var(--top-spacer-height);
  z-index: 1;
  height: 12px;
  border-radius: 0 0 12px 12px;
  background-color: var(--color-accent-rust);
}

.items {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 16px;
  padding: 0 16px;
}

.item {
  border-radius: 24px 24px 16px 16px;
  background-color: var(--color-gray-gray-8);
}

.item__img {
  position: relative;
  border-radius: 12px;
  aspect-ratio: 1 / 1;
  background-position: 50% 50%;
  background-size: cover;
}

.item__tags {
  position: absolute;
  top: 4px;
  left: 4px;
}

.item__tag {
  display: flex;
  align-items: center;
  height: 18px;
  padding: 0 8px;
  border-radius: 18px;
  font: var(--font-caption-c2-bold);
  color: var(--color-gray-gray-1);
  background-color: var(--color-gray-white);
}

.item__price {
  margin-top: 12px;
  padding: 0 12px;
  font: var(--font-numbers-n1);
  color: var(--color-accent-rust);
  letter-spacing: -1.5px;
}

.item__title {
  margin: 2px 0 12px 0;
  padding: 0 12px;
  color: var(--color-gray-gray-3);
  font: var(--font-body-b3);
  text-transform: lowercase;
}
</style>
