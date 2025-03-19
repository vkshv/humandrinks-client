<template>
  <button :class="props.className">
    <slot></slot>
    <div
      v-if="!!slots['extra']"
      class="extra"
    >
      <slot name="extra"></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
const props = defineProps({
  className: String
})
</script>

<style>
</style>
