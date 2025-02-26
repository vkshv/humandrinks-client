import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const init = ref(false)
  const loader = ref(false)

  return {
    init,
    loader
  }
})
