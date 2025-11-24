<template>
  <div class="menu-top-nav-component" @click.stop>
    <Transition>
      <div
        v-if="props.show"
        class="menu-top-nav"
      >
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
  position: fixed;
  top: var(--top-spacer-height);
  z-index: 1000;
  width: 100vw;
  height: 40px;
  border-radius: 0 0 16px 16px;
  background-color: var(--color-gray-gray-1);
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
  color: var(--color-gray-gray-5);
  scroll-snap-align: start;
  white-space: nowrap;
}

.menu-top-nav__carousel-item:first-child {
  margin-left: 8px;
}

.menu-top-nav__carousel-item:last-child {
  margin-right: 8px;
}

.menu-top-nav__carousel-item-active {
  color: var(--color-gray-gray-1);
  background-color: var(--color-gray-white);
}
</style>
