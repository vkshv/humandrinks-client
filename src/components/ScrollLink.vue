<template>
  <div class="scroll-link-component">
    <Transition>
      <div
        v-if="show"
        :class="{
          'scroll-link': true,
          ['scroll-link-' + position]: true
        }"
      >
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  position: 'top' | 'bottom'
}>()
</script>

<style scoped>
.scroll-link-component .v-enter-active,
.scroll-link-component .v-leave-active {
  transition: all 0.2s ease;
}

.scroll-link-component .v-enter-from,
.scroll-link-component .v-leave-to {
  opacity: 0;
  transform: translate(-50%, -24px);
}

.scroll-link {
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 13px;
  border-radius: 32px;
  font: var(--font-body-b1-bold);
  color: var(--color-gray-gray-1);
  background-color: var(--color-accent-yellow);
}

.scroll-link-top {
  top: calc(var(--top-spacer-height) + 60px);
}

.scroll-link-top::after {
  content: "";
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 12px;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='12' viewBox='0 0 24 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 12L-2.09815e-06 12C6 12 9.5388 6.83733 12 2.09815e-06C14.4612 6.83734 18 12 24 12Z' fill='%23F9D61C'/%3E%3C/svg%3E%0A");
  background-size: contain;
  background-repeat: no-repeat;
}

.scroll-link-bottom {
  bottom: var(--bottom-spacer-height);
}

.scroll-link-bottom::after {
  content: "";
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 12px;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='12' viewBox='0 0 24 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.53989e-08 -1.38289e-06L24 7.15256e-07C18 1.90719e-07 14.4612 5.16267 12 12C9.5388 5.16267 6 -8.58354e-07 9.53989e-08 -1.38289e-06Z' fill='%23F9D61C'/%3E%3C/svg%3E%0A");
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
