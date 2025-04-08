<template>
  <button :class="props.className" class="ui-button">
    <slot v-if="!props.loading"></slot>
    <div v-else class="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
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
  className: String,
  loading: Boolean
})
</script>

<style>
</style>
