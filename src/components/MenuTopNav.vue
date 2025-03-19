<template>
  <div class="menu-top-nav-component">
    <Transition>
      <div
        v-if="show"
        class="menu-top-nav"
      >

      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  foodCategories: string[]
  drinkCategories: string[]
  show: boolean
  currentMenuType?: 'food' | 'drink'
  currentCategory?: string
}>()
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
  width: 100vw;
  height: 40px;
  border-radius: 0 0 16px 16px;
  background-color: var(--color-accent-rust);
}
</style>
