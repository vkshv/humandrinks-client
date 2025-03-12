<template>
  <ItemModal v-model="store.isShowDrink" />
</template>

<script setup lang="ts">
import { useItemModalStore } from '@/stores/itemModal'

const store = useItemModalStore()
</script>

<style scoped>
</style>
