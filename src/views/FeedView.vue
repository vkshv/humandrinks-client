<template>
  <div class="feed-view">
    <div class="hero" ref="hero_ref">
      <div class="logo">
        <img src="../assets/logo_new.svg" alt="">
      </div>
      <div class="reserve">
        <ui-button
          class-name="button--secondary"
          @click="reserve"
        >
          Забронировать стол
        </ui-button>
      </div>
    </div>
    <div class="events">
      <div class="events__title">Ивенты</div>
      <div class="events__list">
        <div
          v-for="item in [...contentStore.eventItems].reverse()"
          :key="item.documentId"
          class="events__item"
          @click="itemModalStore.openEvent(item)"
        >
          <div class="events__item-preview">
            <div
              :class="{
                'events__item-img': true,
                'events__item-img_almost-full': item.almostFull
              }"
              :style="{ backgroundImage: `url(${item.picture})` }"
            >
            </div>
            <div
              v-if="item.date"
              class="events__item-date"
            >
              {{ formatDateShort(item.date) }}
            </div>
            <div
              v-if="item.isFull"
              class="events__item-is-full"
            >мест нет</div>
            <div
              v-else-if="item.almostFull"
              class="events__item-almost-full"
            >мало мест</div>
          </div>
        </div>
      </div>
    </div>
    <div class="merch">
      <div class="merch__title">Мерч</div>
      <div class="merch__list">
        <div
          v-for="item in contentStore.merchItems.sortWeight()"
          :key="item.documentId"
          class="merch__item"
          @click="itemModalStore.openMerch(item)"
        >
          <div
            class="merch__item-img"
            :style="{ backgroundImage: `url(${item.picture})` }"
          >
            <div
              v-if="item.count < 4"
              class="merch__item-count"
            >{{ item.count }} осталось</div>
            <div class="merch__item-bonus-price">
              {{ item.bonusPrice }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu" ref="menu_ref">
      <div class="menu__title">Меню</div>
      <div
        v-for="menuType in menuTypes"
        :key="menuType"
        :ref="el => setRef(el, 'menu_' + menuType)"
      >
        <div
          v-for="category in getCategories(menuType)"
          :key="category.name"
          :ref="el => setCategoryRef(el, `${menuType}___${category.name}`)"
          class="menu__category"
        >
          <div class="menu-category__title">{{ category.name }}</div>
          <template v-for="subcategory in (category.subcategories.length ? category.subcategories : [null])">
            <div v-if="subcategory" class="menu-category__subcategory">{{ subcategory }}</div>
            <div class="menu-category__items">
              <div
                v-for="item in getCategoryItems(menuType, category.name, subcategory).sortWeight()"
                class="menu-category__item"
                @click="openMenuModal(menuType, item)"
              >
                <div
                  class="menu-category__item-img"
                  :style="{ backgroundImage: `url(${item.picture})` }"
                >
                  <div class="menu-category__item-tags">
                    <div v-if="item.new" class="menu-category__item-tag">new</div>
                    <div v-if="item.spicy" class="menu-category__item-tag menu-category__item-tag-icon">
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.51875 3.82291C5.6451 3.16295 5.73353 2.26541 5.48085 1.60545C5.45558 1.53946 5.36714 1.53946 5.34188 1.60545C5.07656 2.18621 4.74807 2.60859 4.44485 2.85937C4.44485 2.85937 4.54593 1.05109 3.43412 0.0215497C3.38359 -0.031247 3.30778 0.0215497 3.32042 0.0875456C3.39622 0.615513 3.29515 1.30187 3.08037 1.79024C2.65081 2.72738 2.77715 3.26855 2.77715 3.26855C2.77715 3.26855 2.13281 2.75378 2.29705 1.71104C2.30969 1.64505 2.22125 1.59225 2.17071 1.64505C1.70325 2.14662 1.23579 2.97817 1.64008 4.24529C2.00647 5.36722 1.81696 5.618 1.55164 5.38042C1.34949 5.19563 1.04627 4.85245 0.995738 4.15289C0.983104 4.0737 0.894665 4.0605 0.856763 4.1133C0.806226 4.19249 0.768324 4.27169 0.730422 4.35088C0.225057 5.45961 0.528276 6.66074 1.26105 7.46589C3.1309 6.62114 4.49539 5.12963 5.51875 3.82291Z" fill="#D45135"/>
                        <path d="M11.5957 2.31801C10.7113 2.33121 10.1048 2.70078 9.75108 3.00436C9.70055 2.99116 9.65001 2.95157 9.59947 2.93837C9.25835 2.80638 8.89196 2.79318 8.56348 2.89877C8.82879 3.20235 9.0183 3.66432 9.15728 4.23189C9.4226 4.25829 9.73845 4.33748 10.0417 4.45627C10.2691 4.54867 10.4586 4.65426 10.5976 4.77305C10.6607 4.33748 10.5723 3.92831 10.3575 3.58513C10.6102 3.38714 11.0271 3.17595 11.5957 3.17595C11.8231 3.16275 12 2.99116 12 2.74038C12 2.5028 11.8231 2.30481 11.5957 2.31801Z" fill="#D45135"/>
                        <path d="M8.86674 4.95705C8.67723 4.94385 8.52562 4.79866 8.50035 4.60067C8.34874 3.80872 7.81811 2.01363 6.23884 4.07271C4.84909 5.89419 3.05504 7.78167 0.452413 8.57363C-0.179293 8.77161 -0.141391 9.72195 0.515583 9.82755C3.95206 10.3687 6.35255 9.62956 8.98044 7.63648C11.8105 5.48502 9.72586 5.04945 8.86674 4.95705Z" fill="#D45135"/>
                      </svg>
                    </div>
                    <div v-if="item.vegan" class="menu-category__item-tag menu-category__item-tag-icon">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.0976315 9.04042L0.100392 9.03611C0.471419 8.4403 0.869959 7.85999 1.29049 7.30726C1.71156 6.75391 2.15673 6.22506 2.62665 5.72699C3.52217 4.77996 4.51128 3.93769 5.59464 3.30666C3.74912 3.85607 1.38495 6.13421 1.38495 6.13421C1.35678 4.12284 1.72438 2.52078 3.28351 1.55577C4.77513 0.632502 6.25692 0.553101 7.98399 0.48244C9.17397 0.433568 10 0 10 0C9.71991 1.56365 9.24137 4.88496 7.25255 6.54685C5.17698 8.28112 2.55494 7.52232 2.23341 7.42002C2.14303 7.56799 2.05431 7.71707 1.96746 7.86738C1.63002 8.45199 1.32098 9.05089 1.0358 9.66849C1.02531 9.6909 1.01194 9.71589 0.99868 9.73731C0.825983 10.0145 0.484346 10.0833 0.235522 9.89082C-0.0131912 9.69841 -0.074955 9.31765 0.0976315 9.04042Z" fill="#7A9A2D"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="menu-category__item-info">
                  <div class="menu-category__item-title">{{ item.title }}</div>
                  <div class="menu-category__item-price">{{ item.price }} ₽</div>
                  <div v-if="menuType === 'food'" class="menu-category__item-weight">{{ item.weight }} г</div>
                  <div v-if="menuType === 'drink'" class="menu-category__item-volume">{{ item.volume }} мл</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <ScrollLink
    position="bottom"
    :show="isFoodUnderViewport"
    @click="scrollToMenu"
  >
    меню
  </ScrollLink>
  <MenuTopNav
    :food-categories="contentStore.foodCategories.map((e) => e.name)"
    :drink-categories="contentStore.drinkCategories.map((e) => e.name)"
    :show="visibleCategoryKeys.length > 0 && isHeroOverViewport"
    :current-menu-type="visibleCategoryKeys[0]?.split('___')[0] as 'food' | 'drink' | undefined"
    :current-category="visibleCategoryKeys[0]?.split('___')[1]"
    @scroll-to="scrollTo"
  />
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, shallowRef } from 'vue'
import { useAppStore } from '@/stores/app'
import { useContentStore } from '@/stores/content'
import { useItemModalStore } from '@/stores/itemModal'
import { useAuthStore } from '@/stores/auth'
import { formatDateShort } from '@/helpers'
import type { IFoodItem, IDrinkItem } from '@/types/content'
import Slider from '@/components/TheSlider.vue'
import ScrollLink from '@/components/ScrollLink.vue'
import MenuTopNav from '@/components/MenuTopNav.vue'
import config from '@/config'
import router from '@/router'

const appStore = useAppStore()
const contentStore = useContentStore()
const itemModalStore = useItemModalStore()
const authStore = useAuthStore()

const menu_ref = ref<HTMLElement | null>(null)
const hero_ref = ref<HTMLElement | null>(null)
const refs = shallowRef<{[key: string]: any}>({})
const category_refs = shallowRef<{[key: string]: any}>({})
const setRef = (el: any, key: string) => { if (el) refs.value[key] = el }
const setCategoryRef = (el: any, key: string) => { if (el) category_refs.value[key] = el }
const visibleCategoryKeys = ref<string[]>([])

const isFoodUnderViewport = ref(false)
const isDrinkUnderViewport = ref(false)
const isHeroOverViewport = ref(false)

// const sliderItems = computed(() => {
//   return contentStore.eventItems.slice(0, 3)
// })

const topSpacerHeight = computed(() => {
  const rootStyles = getComputedStyle(document.documentElement)
  const insetTop = rootStyles.getPropertyValue('--tg-safe-area-inset-top')
  const contentInsetTop = rootStyles.getPropertyValue('--tg-content-safe-area-inset-top')
  return parseInt(insetTop) + parseInt(contentInsetTop)
})

// const bonusBadgeCounter = computed(() => {
//   let count = 0
//   if (authStore.userRegData.referralProgram?.activated === false) {
//     count++
//   }
//   return count
// })

const menuTypes = ['food', 'drink']

onMounted(async () => {
  // if (!authStore.userRegData.isPersonalDataConsented) {
  //   itemModalStore.isShowPersonalDataConsent = true
  // }
  appStore.loader = true
  try {
    await Promise.all([
      contentStore.loadFoodCategories(),
      contentStore.loadFoodItems(),
      // contentStore.loadDrinkCategories(),
      // contentStore.loadDrinkItems(),
      // contentStore.loadEventCategories(),
      contentStore.loadEventItems(),
      contentStore.loadMerchItems(),
      // contentStore.loadWhatsnewItems()
    ])
  } catch (error) {
    
  }
  appStore.loader = false

  checkContentVisibility()
  window.addEventListener('scroll', checkContentVisibility)
  window.addEventListener('resize', checkContentVisibility)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkContentVisibility)
  window.removeEventListener('resize', checkContentVisibility)
})

function reserve() {
  try {
    window.Telegram.WebApp.showConfirm('Мы откроем telegram-чат, а приложение закроется. Продолжить?', (answer: boolean) => {
      if (answer) {
        window.Telegram.WebApp.openTelegramLink('https://t.me/humandrinks')
        window.Telegram.WebApp.close()
      }
    })
  } catch (error) {
    // 
  }
}

function showBonus() {
  itemModalStore.openBonus()
}

function getCategories(menuType: string) {
  return menuType === 'food' ? contentStore.foodCategories : contentStore.drinkCategories
}

function getCategoryItems(menuType: string, category: string, subcategory: string | null): any {
  const items = menuType === 'food' ? contentStore.foodItems : contentStore.drinkItems
  return items.filter((e) => e.category === category && (!subcategory || e.subcategory === subcategory) && e.title)
}

function openMenuModal(menuType: string, item: IFoodItem | IDrinkItem) {
  menuType === 'food' ? itemModalStore.openFood(item as IFoodItem) : itemModalStore.openDrink(item as IDrinkItem)
}

function checkContentVisibility() {
  const rectFood = refs.value.menu_food.getBoundingClientRect()
  const rectDrink = refs.value.menu_drink.getBoundingClientRect()
  const rectHero = hero_ref.value?.getBoundingClientRect()
  isFoodUnderViewport.value = (rectFood?.top ?? 0) > window.innerHeight
  isDrinkUnderViewport.value = (rectDrink?.top ?? 0) > window.innerHeight
  isHeroOverViewport.value = (rectHero?.bottom ?? 0) < 0

  visibleCategoryKeys.value = Object.entries(category_refs.value)
    .filter(([_key, el]) => {
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.bottom > 0 && rect.top < topSpacerHeight.value + 41
    })
    .sort(([_keyA, a], [_keyB, b]) => b.getBoundingClientRect().top - a.getBoundingClientRect().top)
    .map(([key, _el]) => key)
}

function scrollTo(menuType: 'food' | 'drink', category?: string) {
  const el = category ? category_refs.value[`${menuType}___${category}`] : refs.value[`menu_${menuType}`]
  let offset = 40
  try {
    offset = offset + topSpacerHeight.value
  } catch (error) {}
  const y = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: y, behavior: 'smooth' })
}

function scrollToMenu() {
  let offset = 40
  try {
    offset = offset + topSpacerHeight.value
  } catch (error) {}
  const y = (menu_ref.value?.getBoundingClientRect().top ?? 0) + window.scrollY - offset
  window.scrollTo({ top: y, behavior: 'smooth' })
}
</script>

<style scoped>
.feed-view {
  padding-bottom: var(--bottom-spacer-height);
}

.hero {
  padding: 16px;
  background-color: var(--color-gray-gray-1);
  border-radius: 0 0 16px 16px;
}

.logo {
  display: flex;
  justify-content: center;
}

.reserve {
  margin-top: 24px;
}

.events {
  display: grid;
  grid-template-rows: repeat(2, max-content);
  margin-top: 32px;
}

.events__title {
  margin-left: 16px;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
  text-transform: uppercase;
}

.events__list {
  display: flex;
  margin-top: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.events__list::-webkit-scrollbar {
  display: none;
}

.events__item {
  scroll-snap-align: start;
  padding-left: 4px;
}

.events__item:first-child {
  padding-left: 16px;
}

.events__item:last-child {
  padding-right: 16px;
}

.events__item-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 161px;
  height: 200px;
}

.events__item-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-position: 50% 50%;
  background-size: cover;
}

.events__item-img_almost-full {
  opacity: 0.8;
}

.events__item-date {
  position: absolute;
  top: 4px;
  left: 4px;
  padding: 4px 8px;
  border-radius: 18px;
  background-color: var(--color-gray-white);
  color: var(--color-gray-gray-1);
  font: var(--font-caption-c2-bold);
  text-transform: uppercase;
}

.events__item-is-full {
  position: relative;
  padding: 4px 8px;
  border-radius: 18px;
  background-color: var(--color-gray-white);
  color: var(--color-gray-gray-1);
  font: var(--font-caption-c2-bold);
}

.events__item-almost-full {
  position: relative;
  padding: 4px 8px;
  border-radius: 18px;
  background-color: var(--color-gray-white);
  color: var(--color-gray-gray-1);
  font: var(--font-caption-c2-bold);
}

.merch {
  display: grid;
  grid-template-rows: repeat(2, max-content);
  margin-top: 32px;
}

.merch__title {
  margin-left: 16px;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
  text-transform: uppercase;
}

.merch__list {
  display: flex;
  margin-top: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.merch__list::-webkit-scrollbar {
  display: none;
}

.merch__item {
  scroll-snap-align: start;
  padding-left: 8px;
}

.merch__item:first-child {
  padding-left: 16px;
}

.merch__item:last-child {
  padding-right: 16px;
}

.merch__item-img {
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 12px;
  background-position: 50% 50%;
  background-size: cover;
}

.merch__item-count {
  position: absolute;
  top: 4px;
  left: 4px;
  padding: 4px 8px;
  border-radius: 18px;
  background-color: var(--color-gray-white);
  color: var(--color-gray-gray-1);
  font: var(--font-caption-c2-bold);
}

.merch__item-bonus-price {
  position: absolute;
  bottom: 4px;
  left: 4px;
  display: flex;
  align-items: center;
  height: 24px;
  padding: 0px 8px 0px 8px;
  border-radius: 24px;
  background-color: var(--color-gray-white);
  color: var(--color-gray-gray-1);
  font: 700 16px/16px JetBrainsMono;
}

.menu {
  margin-top: 32px;
  padding: 0 16px;
}

.menu__title {
  color: var(--color-gray-gray-1);
  font: var(--font-header-h2);
  text-transform: uppercase;
}

.menu__category {
  padding-top: 24px;
}

.menu-category__title {
  color: var(--color-gray-gray-1);
  font: var(--font-header-h3);
  text-transform: uppercase;
}

.menu-category__subcategory {
  margin-top: 8px;
  color: var(--color-gray-gray-1);
  font: var(--font-body-b2);
}

.menu-category__items {
  margin-top: 16px;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, 1fr);
}

.menu-category__item {
  border-radius: 24px 24px 12px 12px;
  background-color: var(--color-gray-gray-8);
}

.menu-category__item-img {
  position: relative;
  border-radius: 12px;
  aspect-ratio: 1 / 1;
  background-position: 50% 50%;
  background-size: cover;
}

.menu-category__item-tags {
  position: absolute;
  top: 4px;
  left: 4px;
  display: flex;
  column-gap: 2px;
}

.menu-category__item-tag {
  display: flex;
  align-items: center;
  height: 18px;
  padding: 0 8px;
  border-radius: 18px;
  font: var(--font-caption-c2-bold);
  color: var(--color-gray-gray-1);
  background-color: var(--color-gray-white);
}

.menu-category__item-tag-icon {
  justify-content: center;
  width: 18px;
  padding: 0;
}

.menu-category__item-info {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: 32px max-content;
  padding: 12px;
}

.menu-category__item-title {
  grid-column: 1 / 3;
  color: var(--color-gray-gray-1);
  font: var(--font-caption-c1);
}

.menu-category__item-price {
  font: 500 14px/16px TTHoves;
}

.menu-category__item-weight {
  font: 500 10px/10px TTHoves;
  color: var(--color-gray-gray-4);
  align-self: end;
  transform: translateY(-2px);
}

.menu-category__item-volume {
  font: 700 10px/10px TTDrugs;
  color: var(--color-gray-gray-4);
  align-self: end;
  transform: translateY(-2px);
}
</style>
