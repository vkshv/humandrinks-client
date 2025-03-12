<template>
  <ItemModal v-model="store.isShowFood" />
</template>

<script setup lang="ts">
import { useItemModalStore } from '@/stores/itemModal'

const store = useItemModalStore()
</script>

<style scoped>
</style>
