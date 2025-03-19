<template>
  <div class="feed-view">
    <div class="hero">
      <div class="event-slider">
        <Slider :slot-names="sliderItems.map((e) => e.documentId)">
          <template
            v-for="item in sliderItems"
            :key="item.documentId"
            v-slot:[item.documentId]
          >
            <div
              class="event-slider__item"
              :style="{ backgroundImage: `url(${config.STRAPI_URL + item.picture})` }"
              @click="itemModalStore.openEvent(item)"
            >
              <div class="event-slider__title">{{ item.title }}</div>
              <div class="event-slider__subtitle">{{ formatDate(item.date) }}&nbsp;&nbsp;·&nbsp;&nbsp;{{ item.category }}</div>
            </div>
          </template>
        </Slider>
      </div>
      <div class="actions">
        <ui-button
          class="actions__bonus"
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
          class-name="button--hero"
          @click="router.push('/merch')"
        >
          мерч
        </ui-button>
        <ui-button
          class-name="button--hero"
          @click="router.push('/events')"
        >
          ивенты
        </ui-button>
        <ui-button
          class="actions__reserve"
          class-name="button--secondary"
          @click=""
        >
          забронировать стол
        </ui-button>
      </div>
    </div>
    <div class="events">
      <div class="events__title">скоро</div>
      <div class="events__all" @click="router.push('/events')">Все</div>
      <div class="events__list">
        <div
          v-for="item in contentStore.eventItems"
          :key="item.documentId"
          class="events__item"
          @click="itemModalStore.openEvent(item)"
        >
          <div
            class="events__item-img"
            :style="{ backgroundImage: `url(${config.STRAPI_URL + item.picture})` }"
          >
            <div
              v-if="item.almostFull"
              class="events__item-almost-full"
            >мало мест</div>
          </div>
          <div class="events__item-title">
            {{ item.title }}
          </div>
          <div class="events__item-date">
            {{ formatDate(item.date) }}
          </div>
        </div>
      </div>
    </div>
    <div class="merch">
      <div class="merch__title">мерч</div>
      <div class="merch__all" @click="router.push('/merch')">Все</div>
      <div class="merch__list">
        <div
          v-for="item in contentStore.merchItems"
          :key="item.documentId"
          class="merch__item"
          @click="itemModalStore.openMerch(item)"
        >
          <div
            class="merch__item-img"
            :style="{ backgroundImage: `url(${config.STRAPI_URL + item.picture})` }"
          >
            <div
              v-if="item.count < 4"
              class="merch__item-count"
            >{{ item.count }} осталось</div>
            <div class="merch__item-bonus-price">
              <span>{{ item.bonusPrice }}</span>
              <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.69852 1.23098C6.76563 1.26833 6.8183 1.32708 6.84812 1.39786C6.87794 1.46863 6.8832 1.54736 6.86306 1.62148L5.95006 4.96868H9.28123C9.34822 4.96869 9.41375 4.98827 9.46976 5.02501C9.52577 5.06176 9.56983 5.11407 9.59651 5.17552C9.62319 5.23697 9.63134 5.30487 9.61995 5.37089C9.60856 5.4369 9.57813 5.49815 9.5324 5.5471L4.7199 10.7034C4.66748 10.7596 4.5977 10.7967 4.52172 10.8087C4.44575 10.8206 4.36796 10.8067 4.3008 10.7692C4.23365 10.7317 4.181 10.6728 4.15128 10.6019C4.12157 10.5309 4.1165 10.4521 4.1369 10.3779L5.0499 7.03118H1.71873C1.65174 7.03118 1.58621 7.0116 1.5302 6.97486C1.47418 6.93811 1.43013 6.8858 1.40344 6.82435C1.37676 6.7629 1.36862 6.695 1.38001 6.62898C1.3914 6.56297 1.42183 6.50172 1.46756 6.45277L6.28006 1.29652C6.33248 1.24044 6.40216 1.20352 6.478 1.19164C6.55383 1.17976 6.63147 1.19361 6.69852 1.23098Z" fill="#11110F"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu" ref="menu_ref">
      <div class="menu__title">меню</div>
      <div
        v-for="menuType in menuTypes"
        :key="menuType"
        :ref="el => setRef(el, 'menu_' + menuType)"
      >
        <div
          v-for="category in getCategories(menuType)"
          :key="category"
          :ref="el => setCategoryRef(el, `${menuType}___${category}`)"
          class="menu__category"
        >
          <div class="menu-category__title">{{ category }}</div>
          <div class="menu-category__items">
            <div
              v-for="item in getCategoryItems(menuType, category)"
              class="menu-category__item"
              @click="openMenuModal(menuType, item)"
            >
              <div
                class="menu-category__item-img"
                :style="{ backgroundImage: `url(${config.STRAPI_URL + item.picture})` }"
              ></div>
              <div class="menu-category__item-price">{{ item.price }} P</div>
              <div class="menu-category__item-title">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ScrollLink
    position="bottom"
    :show="isFoodUnderViewport && isDrinkUnderViewport"
    @click="scrollToMenu"
  >
    меню
  </ScrollLink>
  <ScrollLink
    position="bottom"
    :show="!isFoodUnderViewport && isDrinkUnderViewport"
    @click="scrollTo('drink')"
  >
    бар
  </ScrollLink>
  <ScrollLink
    position="top"
    :show="!isFoodUnderViewport && !isDrinkUnderViewport"
    @click="scrollTo('food')"
  >
    еда
  </ScrollLink>
  <MenuTopNav
    :food-categories="contentStore.foodCategories"
    :drink-categories="contentStore.drinkCategories"
    :show="visibleCategoryKeys.length > 0"
    :current-menu-type="visibleCategoryKeys[0]?.split('___')[0] as 'food' | 'drink' | undefined"
    :current-category="visibleCategoryKeys[0]?.split('___')[1]"
  />
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, shallowRef } from 'vue'
import { useAppStore } from '@/stores/app'
import { useContentStore } from '@/stores/content'
import { useItemModalStore } from '@/stores/itemModal'
import { useAuthStore } from '@/stores/auth'
import { formatDate } from '@/helpers'
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
const refs = shallowRef<{[key: string]: any}>({})
const category_refs = shallowRef<{[key: string]: any}>({})
const setRef = (el: any, key: string) => { if (el) refs.value[key] = el }
const setCategoryRef = (el: any, key: string) => { if (el) category_refs.value[key] = el }
const visibleCategoryKeys = ref<string[]>([])

const isFoodUnderViewport = ref(false)
const isDrinkUnderViewport = ref(false)

const sliderItems = computed(() => {
  return contentStore.eventItems.slice(0, 3)
})

const menuTypes = ['food', 'drink']

onMounted(async () => {
  appStore.loader = true
  try {
    await Promise.all([
      contentStore.loadFoodCategories(),
      contentStore.loadFoodItems(),
      contentStore.loadDrinkCategories(),
      contentStore.loadDrinkItems(),
      contentStore.loadEventCategories(),
      contentStore.loadEventItems(),
      contentStore.loadMerchItems()
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

function showBonus() {
  itemModalStore.openBonus()
}

function getCategories(menuType: string) {
  return menuType === 'food' ? contentStore.foodCategories : contentStore.drinkCategories
}

function getCategoryItems(menuType: string, category: string) {
  const items = menuType === 'food' ? contentStore.foodItems : contentStore.drinkItems
  return items.filter((e) => e.category === category)
}

function openMenuModal(menuType: string, item: IFoodItem | IDrinkItem) {
  menuType === 'food' ? itemModalStore.openFood(item as IFoodItem) : itemModalStore.openDrink(item as IDrinkItem)
}

function checkContentVisibility() {
  const rectFood = refs.value.menu_food.getBoundingClientRect()
  const rectDrink = refs.value.menu_drink.getBoundingClientRect()
  isFoodUnderViewport.value = (rectFood?.top ?? 0) > window.innerHeight
  isDrinkUnderViewport.value = (rectDrink?.top ?? 0) > window.innerHeight

  visibleCategoryKeys.value = Object.entries(category_refs.value)
    .filter(([_key, el]) => {
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.top >= 0 && rect.top < window.innerHeight
    })
    .sort(([_keyA, a], [_keyB, b]) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
    .map(([key, _el]) => key)
}

function scrollTo(menuType: 'food' | 'drink', category?: string) {
  const el = category ? refs.value[`menu_${menuType}_${category}`] : refs.value[`menu_${menuType}`]
  el?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToMenu() {
  menu_ref.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* .feed-view {} */

.hero {
  padding: 4px 8px 8px 8px;
  background-color: var(--color-accent-rust);
  border-radius: 0 0 16px 16px;
}

.event-slider {
  height: 202px;
}

.event-slider__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 4px;
  height: 202px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}

.event-slider__title {
  font: var(--font-header-h1);
  color: var(--color-gray-white);
  text-transform: lowercase;
}

.event-slider__subtitle {
  font: var(--font-body-b3);
  color: var(--color-gray-white);
  text-transform: lowercase;
}

.actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, max-content);
  gap: 4px;
  margin-top: 8px;
}

.actions__bonus {
  grid-row: 1 / 3;
}

.actions__reserve {
  grid-column: 1 / 3;
  margin-top: 4px;
}

.actions__bonus-extra {
  display: flex;
  column-gap: 4px;
  font: 400 18px/18px Biform;
}

.events {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: repeat(2, max-content);
  margin-top: 32px;
}

.events__title {
  margin-left: 16px;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
}

.events__all {
  margin-right: 16px;
  font: var(--font-body-b3-bold);
  color: var(--color-gray-gray-4);
}

.events__list {
  grid-column: 1 / 3;
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
  padding-left: 5px;
}

.events__item:first-child {
  padding-left: 16px;
}

.events__item:last-child {
  padding-right: 16px;
}

.events__item-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 108px;
  height: 108px;
  border-radius: 54px;
  background-position: 50% 50%;
  background-size: cover;
}

.events__item-almost-full {
  padding: 4px 8px;
  border-radius: 18px;
  background-color: var(--color-gray-white);
  color: var(--color-gray-gray-1);
  font: var(--font-caption-c2-bold);
}

.events__item-title {
  margin-top: 8px;
  font: var(--font-caption-c1-bold);
  color: var(--color-gray-gray-1);
  text-align: center;
  text-transform: lowercase;
}

.events__item-date {
  margin-top: 2px;
  font: var(--font-caption-c2);
  color: var(--color-gray-gray-4);
  text-align: center;
}

.merch {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: repeat(2, max-content);
  margin-top: 32px;
}

.merch__title {
  margin-left: 16px;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
}

.merch__all {
  margin-right: 16px;
  font: var(--font-body-b3-bold);
  color: var(--color-gray-gray-4);
}

.merch__list {
  grid-column: 1 / 3;
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
  padding: 3px 8px 6px 8px;
  border-radius: 24px;
  background-color: var(--color-gray-white);
  color: var(--color-gray-gray-1);
  font: 400 14px/14px Biform;
}

.merch__item-bonus-price > span {
  margin-right: 2px;
}

.menu {
  margin-top: 32px;
  padding: 0 16px;
}

.menu__title {
  color: var(--color-gray-gray-1);
  font: var(--font-header-h2);
}

.menu__category {
  margin-top: 24px;
}

.menu-category__title {
  color: var(--color-gray-gray-1);
  font: var(--font-header-h3);
  text-transform: lowercase;
}

.menu-category__items {
  margin-top: 16px;
  display: grid;
  column-gap: 8px;
  grid-template-columns: repeat(2, 1fr);
}

.menu-category__item {
  border-radius: 24px 24px 16px 16px;
  background-color: var(--color-gray-gray-8);
}

.menu-category__item-img {
  border-radius: 12px;
  aspect-ratio: 1 / 1;
}

.menu-category__item-price {
  margin-top: 12px;
  padding: 0 12px;
  font: var(--font-numbers-n1);
}

.menu-category__item-title {
  margin: 2px 0 12px 0;
  padding: 0 12px;
  color: var(--color-gray-gray-3);
  font: var(--font-body-b3);
  text-transform: lowercase;
}
</style>
