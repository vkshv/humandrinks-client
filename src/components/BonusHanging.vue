<template>
  <div class="bonus-hanging-component">
    <Transition>
      <div
        v-if="show"
        class="bonus-hanging"
      >
        Бонусы <span>{{ authStore.userRegData.bonus }}</span>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.91643 0.863882C7.99574 0.908026 8.05799 0.977459 8.09323 1.0611C8.12848 1.14475 8.13469 1.23779 8.11089 1.32538L7.03189 5.28117H10.9687C11.0479 5.28118 11.1253 5.30432 11.1915 5.34774C11.2577 5.39117 11.3098 5.45299 11.3413 5.52561C11.3729 5.59823 11.3825 5.67848 11.369 5.7565C11.3556 5.83452 11.3196 5.9069 11.2656 5.96476L5.57806 12.0585C5.51611 12.125 5.43365 12.1688 5.34386 12.183C5.25406 12.1971 5.16213 12.1807 5.08277 12.1364C5.0034 12.0921 4.94118 12.0224 4.90606 11.9386C4.87095 11.8548 4.86496 11.7616 4.88906 11.6739L5.96806 7.71867H2.03122C1.95205 7.71867 1.87461 7.69553 1.80841 7.6521C1.74221 7.60868 1.69015 7.54685 1.65862 7.47423C1.62708 7.40161 1.61745 7.32136 1.63092 7.24334C1.64438 7.16533 1.68034 7.09294 1.73439 7.03509L7.42189 0.94134C7.48384 0.875065 7.56619 0.831432 7.65582 0.817394C7.74544 0.803356 7.83719 0.819721 7.91643 0.863882Z" fill="#11110F"/>
        </svg>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

defineProps<{
  show: boolean
}>()
</script>

<style scoped>
.bonus-hanging-component .v-enter-active,
.bonus-hanging-component .v-leave-active {
  transition: all 0.2s ease;
}

.bonus-hanging-component .v-enter-from,
.bonus-hanging-component .v-leave-to {
  opacity: 0;
  transform: translate(-50%, -24px);
}

.bonus-hanging {
  position: fixed;
  top: calc(var(--top-spacer-height) + 20px);
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  column-gap: 4px;
  height: 32px;
  padding: 0 12px;
  border-radius: 32px;
  font: var(--font-body-b1-bold);
  color: var(--color-gray-gray-1);
  background-color: var(--color-accent-yellow);
}

.bonus-hanging > span {
  font: 400 18px/18px Biform;
  letter-spacing: -1.5px;
}
</style>
