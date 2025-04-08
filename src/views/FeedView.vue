<template>
  <div class="feed-view">
    <div class="hero" ref="hero_ref">
      <div class="greetings">
        Привет,<br/>{{ authStore.userRegData.name }}!
      </div>
      <div class="bonus">
        <div class="bonus__title">Бонусная<br/> карта</div>
        <div class="bonus__read-more" @click="showBonus">Подробнее</div>
        <div class="bonus__card">
          <div class="bonus__value"></div>
          <div class="bonus__card-number"></div>
        </div>
      </div>
      <div class="reserve">
        <ui-button
          class-name="button--secondary"
          @click="router.push('/reserve')"
        >
          Забронировать стол
        </ui-button>
      </div>
      <!-- <div class="event-slider">
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
      </div> -->
      <!-- <div class="actions">
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
          @click="router.push('/reserve')"
        >
          забронировать стол
        </ui-button>
      </div> -->
    </div>
    <div class="events">
      <div class="events__title">Ивенты</div>
      <!-- <div class="events__all" @click="router.push('/events')">Все</div> -->
      <div class="events__list">
        <div
          v-for="item in contentStore.eventItems"
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
              :style="{ backgroundImage: `url(${config.STRAPI_URL + item.picture})` }"
            >
            </div>
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
      <div class="merch__title">Мерч</div>
      <!-- <div class="merch__all" @click="router.push('/merch')">Все</div> -->
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
    <div class="whats-new">
      <div class="whats-new__title">Что нового?</div>
      <div class="whats-new__list">
        <div
          v-for="item in contentStore.whatsnewItems"
          :key="item.documentId"
          class="whats-new__item"
          @click="itemModalStore.openWhatsnew(item)"
        >
          <div class="whats-new__item-outer">
            <div class="whats-new__item-inner">
              <div class="whats-new__item-title">{{ item.title }}</div>
              <div class="whats-new__item-date">{{ formatPastDate(item.date) }}</div>
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
                v-for="item in getCategoryItems(menuType, category.name, subcategory)"
                class="menu-category__item"
                @click="openMenuModal(menuType, item)"
              >
                <div
                  class="menu-category__item-img"
                  :style="{ backgroundImage: `url(${config.STRAPI_URL + item.picture})` }"
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
import { formatDate, formatPastDate } from '@/helpers'
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
      contentStore.loadMerchItems(),
      contentStore.loadWhatsnewItems()
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

function getCategoryItems(menuType: string, category: string, subcategory: string | null): any {
  const items = menuType === 'food' ? contentStore.foodItems : contentStore.drinkItems
  return items.filter((e) => e.category === category && (!subcategory || e.subcategory === subcategory))
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
      return rect.bottom > 0 && rect.top < window.innerHeight
    })
    .sort(([_keyA, a], [_keyB, b]) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
    .map(([key, _el]) => key)
}

function scrollTo(menuType: 'food' | 'drink', category?: string) {
  const el = category ? category_refs.value[`${menuType}___${category}`] : refs.value[`menu_${menuType}`]
  let offset = 40
  try {
    offset + window.Telegram.WebApp.SafeAreaInset.top + window.Telegram.WebApp.ContentSafeAreaInset.top
  } catch (error) {}
  const y = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: y, behavior: 'smooth' })
}

function scrollToMenu() {
  let offset = 40
  try {
    offset + window.Telegram.WebApp.SafeAreaInset.top + window.Telegram.WebApp.ContentSafeAreaInset.top
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
  padding: 12px 8px 8px 8px;
  background-color: var(--color-accent-rust);
  border-radius: 0 0 16px 16px;
}

.greetings {
  font: 900 40px/40px TTDrugs;
  color: var(--color-gray-white);
  text-align: center;
}

.bonus {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: repeat(2, 1fr);
  margin-top: 16px;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--color-support-coral-1), transparent 80%);
  background-color: color-mix(in srgb, var(--color-gray-gray-1), transparent 80%);
  background-clip: padding-box;
}

.bonus__title {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  margin: 16px 0 0 16px;
  font: 900 20px/20px TTDrugs;
  color: var(--color-gray-white);
}

.bonus__read-more {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  align-self: end;
  margin: 0 0 16px 16px;
  font: 700 12px/16px TTDrugs;
  color: var(--color-gray-white);
}

.bonus__card {
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  width: 168px;
  height: 108px;
}

.bonus__value {}

.bonus__card-number {}

.reserve {
  margin-top: 8px;
}

/* .event-slider {
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
} */

/* .actions {
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
  letter-spacing: -1.5px;
} */

.events {
  display: grid;
  /* grid-template-columns: 1fr max-content; */
  grid-template-rows: repeat(2, max-content);
  margin-top: 32px;
}

.events__title {
  margin-left: 16px;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
}

/* .events__all {
  margin-right: 16px;
  font: var(--font-body-b3-bold);
  color: var(--color-gray-gray-4);
} */

.events__list {
  /* grid-column: 1 / 3; */
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

.events__item-almost-full {
  position: relative;
  padding: 4px 8px;
  border-radius: 18px;
  background-color: var(--color-gray-white);
  color: var(--color-gray-gray-1);
  font: var(--font-caption-c2-bold);
}

.events__item-title {
  margin-top: 12px;
  font: var(--font-caption-c1-bold);
  color: var(--color-gray-gray-1);
  text-align: center;
}

.events__item-date {
  margin-top: 2px;
  font: var(--font-caption-c2);
  color: var(--color-gray-gray-4);
  text-align: center;
}

.merch {
  display: grid;
  /* grid-template-columns: 1fr max-content; */
  grid-template-rows: repeat(2, max-content);
  margin-top: 32px;
}

.merch__title {
  margin-left: 16px;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
}

/* .merch__all {
  margin-right: 16px;
  font: var(--font-body-b3-bold);
  color: var(--color-gray-gray-4);
} */

.merch__list {
  /* grid-column: 1 / 3; */
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
  font: italic 700 16px/16px TTDrugs;
}

.merch__item-bonus-price > span {
  margin-right: 2px;
}

.whats-new {
  display: grid;
  grid-template-rows: repeat(2, max-content);
  margin-top: 32px;
}

.whats-new__title {
  margin-left: 16px;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
}

.whats-new__list {
  display: flex;
  margin-top: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.whats-new__list::-webkit-scrollbar {
  display: none;
}

.whats-new__item {
  scroll-snap-align: start;
  padding-left: 8px;
}

.whats-new__item:first-child {
  padding-left: 16px;
}

.whats-new__item:last-child {
  padding-right: 16px;
}

.whats-new__item-outer {
  width: 220px;
  height: 138px;
  padding: 2px;
  border-radius: 12px;
  background-color: var(--color-accent-rust);
}

.whats-new__item-inner {
  display: grid;
  grid-template-rows: 1fr max-content;
  height: 100%;
  border: 1px solid var(--color-gray-white);
  border-radius: 10px;
  background-color: var(--color-accent-rust);
  box-sizing: border-box;
}

.whats-new__item-title {
  padding: 13px 13px 0 13px;
  font: 900 18px/18px TTDrugs;
  color: var(--color-gray-white);
}

.whats-new__item-date {
  padding: 0 13px 13px 13px;
  font: var(--font-caption-c1);
  color: var(--color-gray-white);
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
  padding-top: 24px;
}

.menu-category__title {
  color: var(--color-gray-gray-1);
  font: var(--font-header-h3);
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
  font: 700 14px/16px TTDrugs;
}

.menu-category__item-weight {
  font: 700 10px/10px TTDrugs;
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
