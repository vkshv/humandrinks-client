<template>
  <div class="menu-top-nav-component" @click.stop>
    <Transition>
      <div
        v-if="props.show"
        class="menu-top-nav"
      >
        <div class="menu-top-nav__dropdown">
          <div class="menu-top-nav__dropdown-activator">
            <div v-if="isShowDropdown" @click="isShowDropdown = false">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="white" stroke="#EA7D66"/>
                <path d="M11 11L20.9998 20.9998" stroke="#141416" stroke-width="1.5"/>
                <path d="M21 11L11.0002 20.9998" stroke="#141416" stroke-width="1.5"/>
              </svg>
            </div>
            <div v-else @click="isShowDropdown = true">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="white" stroke="#EA7D66"/>
                <rect width="20" height="20" transform="translate(6 6)" fill="white"/>
                <path d="M10.1665 18.5H21.8332M10.1665 13.5H21.8332" stroke="#11110F" stroke-width="1.5" stroke-linecap="square"/>
              </svg>
            </div>
          </div>

          <div class="menu-top-nav__dropdown-menu">
            <Transition>
              <div v-if="isShowDropdown" class="dropdown-menu" v-click-outside="() => isShowDropdown = false">
                <div class="dropdown-menu__type">
                  <div
                    v-for="menuType in dropdownMenuTypes"
                    :class="{
                      'dropdown-menu__type-item': true,
                      'dropdown-menu__type-item-active': dropdownMenuType === menuType.value
                    }"
                    @click="dropdownMenuType = menuType.value"
                  >{{ menuType.title }}</div>
                </div>
                <div class="dropdown-menu__list">
                  <div
                    v-for="item in (dropdownMenuType === 'food' ? props.foodCategories : props.drinkCategories)"
                    class="dropdown-menu__list-item"
                    @click="categoryClickHandler(dropdownMenuType, item)"
                  >{{ item }}</div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        <div class="menu-top-nav__carousel">
          <div
            v-for="category in carouselItems"
            :class="{
              'menu-top-nav__carousel-item': true,
              'menu-top-nav__carousel-item-active': category === props.currentCategory
            }"
            @click="emit('scrollTo', props.currentMenuType, category)"
          >
            {{ category }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  foodCategories: string[]
  drinkCategories: string[]
  show: boolean
  currentMenuType?: 'food' | 'drink'
  currentCategory?: string
}>()

const emit = defineEmits(['scrollTo'])

const isShowDropdown = ref(false)
const dropdownMenuType = ref('food')
const dropdownMenuTypes = [
  { title: 'еда', value: 'food' },
  { title: 'бар', value: 'drink' }
]

const carouselItems = computed(() => {
  if (props.currentMenuType === 'food') return props.foodCategories
  if (props.currentMenuType === 'drink') return props.drinkCategories
  return []
})

function categoryClickHandler(_dropdownMenuType: string, item: string) {
  emit('scrollTo', _dropdownMenuType, item)
  isShowDropdown.value = false
}
</script>

<style scoped>
.menu-top-nav-component .v-enter-active,
.menu-top-nav-component .v-leave-active {
  transition: transform 0.2s ease;
}

.menu-top-nav-component .v-enter-from,
.menu-top-nav-component .v-leave-to {
  transform: translateY(-40px);
}

.menu-top-nav {
  display: grid;
  grid-template-columns: 44px 1fr;
  position: fixed;
  top: var(--top-spacer-height);
  z-index: 1000;
  width: 100vw;
  height: 40px;
  border-radius: 0 0 16px 16px;
  background-color: var(--color-accent-rust);
}

.menu-top-nav__dropdown {
  position: relative;
  padding-left: 8px;
}

.menu-top-nav__dropdown-menu {
  position: absolute;
  top: 48px;
  left: 8px;
}

.menu-top-nav__dropdown-menu .v-enter-active,
.menu-top-nav__dropdown-menu .v-leave-active {
  transition: all 0.2s ease;
}

.menu-top-nav__dropdown-menu .v-enter-from,
.menu-top-nav__dropdown-menu .v-leave-to {
  transform: translateY(-40px);
  opacity: 0;
}

.dropdown-menu {
  padding-top: 16px;
  border-radius: 16px;
  background-color: var(--color-gray-white);
  box-shadow: var(--shadow-small-shadow);
}

.dropdown-menu__type {
  display: flex;
  margin: 0 16px 8px 16px;
  padding: 4px;
  border-radius: 40px;
  background-color: var(--color-gray-gray-7);
}

.dropdown-menu__type-item {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 32px;
  font: var(--font-body-b1-bold);
  color: var(--color-gray-gray-4);
}

.dropdown-menu__type-item-active {
  color: var(--color-gray-white);
  background-color: var(--color-gray-gray-1);
  border-radius: 32px;
}

.dropdown-menu__list {
  padding-bottom: 8px;
}

.dropdown-menu__list-item {
  padding: 16px;
  font: var(--font-body-b2-bold);
  color: var(--color-gray-gray-1);
  border-bottom: 1px solid var(--color-gray-gray-7);
}

.dropdown-menu__list-item:last-child {
  border-bottom: none;
}

.menu-top-nav__carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.menu-top-nav__carousel::-webkit-scrollbar {
  display: none;
}


.menu-top-nav__carousel-item {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 12px;
  border-radius: 32px;
  font: var(--font-body-b2-bold);
  color: var(--color-support-coral-3);
  scroll-snap-align: start;
  white-space: nowrap;
}

.menu-top-nav__carousel-item-active {
  color: var(--color-gray-gray-1);
  background-color: var(--color-gray-white);
}
</style>
