<template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useContentStore } from '@/stores/content'

const appStore = useAppStore()
const contentStore = useContentStore()

onMounted(async () => {
  appStore.loader = true
  try {
    await Promise.all([
      contentStore.loadEventItems(),
      contentStore.loadEventCategories(),
      contentStore.loadMerchItems()
    ])
  } catch (error) {
    
  }
  appStore.loader = false
})
</script>
